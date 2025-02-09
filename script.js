const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };
snake[1] = { x: 8 * box, y: 10 * box };

let ball = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;
let highestScore = 0;
let d = 'RIGHT';
let game;
let isGameOver = false;
let isPaused = false;
let gameStarted = false;

const scoreDisplay = document.getElementById('scoreDisplay');
const highestScoreDisplay = document.getElementById('highestScoreDisplay');
const gameOverPopup = document.getElementById('gameOverPopup');
const finalScore = document.getElementById('finalScore');
const highestScorePopup = document.getElementById('highestScorePopup');
const closePopup = document.getElementById('closePopup');
const gameContent = document.getElementById('gameContent');
const pauseButton = document.getElementById('pauseButton');
const popupRestartButton = document.getElementById('popupRestartButton');
const pausePopup = document.getElementById('pausePopup');
const resumeButton = document.getElementById('resumeButton');
const difficultyRange = document.getElementById('difficultyRange');
const difficultyText = document.getElementById('difficultyText');

const SPEED = {
    EASY: 150,
    MEDIUM: 100,
    HARD: 50
};

document.addEventListener('keydown', (event) => {
    if (!gameStarted && [37, 38, 39, 40].includes(event.keyCode)) {
        gameStarted = true;
        const speed = difficultyText.textContent === 'Easy' ? SPEED.EASY :
                     difficultyText.textContent === 'Hard' ? SPEED.HARD :
                     SPEED.MEDIUM;
        game = setInterval(draw, speed);
    }
    if (event.keyCode === 32) { // Space bar
        togglePause();
    } else {
        direction(event);
    }
});
document.getElementById('restartButton').addEventListener('click', restartGame);
pauseButton.addEventListener('click', togglePause);
closePopup.addEventListener('click', () => {
    gameOverPopup.classList.add('hidden');
    gameContent.classList.remove('blur');
});
popupRestartButton.addEventListener('click', restartGame);
resumeButton.addEventListener('click', togglePause);

function togglePause() {
    if (isGameOver) return;
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(game);
        pauseButton.textContent = 'Resume';
        pausePopup.classList.remove('hidden');
        gameContent.classList.add('blur');
    } else {
        const speed = difficultyText.textContent === 'Easy' ? SPEED.EASY :
                     difficultyText.textContent === 'Hard' ? SPEED.HARD :
                     SPEED.MEDIUM;
        game = setInterval(draw, speed);
        pauseButton.textContent = 'Pause';
        pausePopup.classList.add('hidden');
        gameContent.classList.remove('blur');
    }
}

function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') {
        d = 'LEFT';
    } else if (event.keyCode == 38 && d != 'DOWN') {
        d = 'UP';
    } else if (event.keyCode == 39 && d != 'LEFT') {
        d = 'RIGHT';
    } else if (event.keyCode == 40 && d != 'UP') {
        d = 'DOWN';
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    clearInterval(game);
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    snake[1] = { x: 8 * box, y: 10 * box };
    ball = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    score = 0;
    d = 'RIGHT';
    isGameOver = false;
    isPaused = false;
    gameStarted = false;
    scoreDisplay.textContent = score;
    highestScoreDisplay.textContent = highestScore;
    gameOverPopup.classList.add('hidden');
    pausePopup.classList.add('hidden');
    gameContent.classList.remove('blur');
    pauseButton.textContent = 'Pause';
    
    draw();
}

function draw() {
    if (isGameOver || isPaused) return;

    ctx.fillStyle = '#1a202c'; // Dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#2d3748'; // Grid color
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= canvas.width; x += box) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += box) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Draw snake and ball
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? '#90cdf4' : '#4299e1'; // Light blue head, blue body
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = '#2b6cb0'; // Darker border
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = '#f56565'; // Red ball
    ctx.beginPath();
    ctx.arc(ball.x + box / 2, ball.y + box / 2, box / 2, 0, Math.PI * 2);
    ctx.fill();

    // Only update snake position if game has started
    if (gameStarted) {
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (d == 'LEFT') snakeX -= box;
        if (d == 'UP') snakeY -= box;
        if (d == 'RIGHT') snakeX += box;
        if (d == 'DOWN') snakeY += box;

        if (snakeX == ball.x && snakeY == ball.y) {
            score++;
            scoreDisplay.textContent = score;
            ball = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box
            };
        } else {
            snake.pop();
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        };

        if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game);
            isGameOver = true;
            finalScore.textContent = score;
            if (score > highestScore) {
                highestScore = score;
            }
            highestScorePopup.textContent = highestScore;
            gameOverPopup.classList.remove('hidden');
            gameContent.classList.add('blur');
        }

        snake.unshift(newHead);
    }
}

function updateDifficulty() {
    const value = parseInt(difficultyRange.value);
    let newValue;
    let difficulty;
    
    if (value < 33) {
        newValue = 0;
        difficulty = 'Easy';
        difficultyRange.style.setProperty('--range-progress', '0%');
    } else if (value < 66) {
        newValue = 50;
        difficulty = 'Medium';
        difficultyRange.style.setProperty('--range-progress', '50%');
    } else {
        newValue = 100;
        difficulty = 'Hard';
        difficultyRange.style.setProperty('--range-progress', '100%');
    }
    
    if (gameStarted) {
        clearInterval(game);
        const speed = difficulty === 'Easy' ? SPEED.EASY :
                     difficulty === 'Hard' ? SPEED.HARD :
                     SPEED.MEDIUM;
        game = setInterval(draw, speed);
    }
    
    difficultyRange.value = newValue;
    difficultyText.textContent = difficulty;
}

difficultyRange.addEventListener('input', updateDifficulty);
difficultyRange.addEventListener('change', updateDifficulty);

// Initial draw to show the game state without movement
draw();

// Call updateDifficulty once to set initial state
updateDifficulty(); 