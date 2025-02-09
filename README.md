# Snake Game

A modern implementation of the classic Snake game using HTML5 Canvas, JavaScript, and TailwindCSS.

## Features

- Responsive canvas-based gameplay
- Three difficulty levels (Easy, Medium, Hard)
- Score tracking with highest score memory
- Pause/Resume functionality
- Interactive difficulty slider
- Mobile-friendly controls
- Modern UI with popups and blur effects

## Technical Components

### Core Technologies
- HTML5 Canvas for game rendering
- Vanilla JavaScript for game logic
- TailwindCSS for styling
- Custom CSS for range input styling

### Game Components

1. **Canvas (`gameCanvas`)**
   - 400x400 pixel game area
   - Grid-based movement system
   - Collision detection

2. **Snake**
   - Array-based implementation
   - Dynamic growth mechanism
   - Four-direction movement (UP, DOWN, LEFT, RIGHT)
   - Collision detection with walls and self

3. **Controls**
   - Arrow keys for direction
   - Space bar for pause/resume
   - Interactive buttons for restart and pause
   - Custom range slider for difficulty selection

4. **Difficulty System**
   - Easy: 150ms update interval
   - Medium: 100ms update interval
   - Hard: 50ms update interval
   - Interactive slider with visual markers

5. **UI Elements**
   - Score display
   - Highest score tracking
   - Game over popup
   - Pause menu
   - Difficulty indicator

### Styling Features

1. **Custom Range Input**
   - Built-in difficulty markers
   - Progressive color fill
   - Hover effects
   - Cross-browser compatibility

2. **Popups**
   - Semi-transparent overlay
   - Centered positioning
   - Responsive design
   - Blur effect on background

## Game Mechanics

1. **Movement**
   - Grid-based movement system
   - Prevention of reverse direction
   - Continuous movement in current direction

2. **Scoring**
   - Points awarded for eating balls
   - High score persistence
   - Real-time score updates

3. **Game States**
   - Initial state
   - Playing state
   - Paused state
   - Game over state

4. **Collision Detection**
   - Wall collisions
   - Self collisions
   - Ball collection

## Usage

1. **Starting the Game**
   - Press any arrow key to begin
   - Select difficulty before starting (optional)

2. **Controls**
   - ↑: Move Up
   - ↓: Move Down
   - ←: Move Left
   - →: Move Right
   - Space: Pause/Resume
   - Difficulty Slider: Adjust game speed

3. **Scoring**
   - Collect red balls to increase score
   - Avoid walls and snake body
   - Try to beat the highest score

## Development

The game is built with a modular structure:
- `index.html`: Game structure and styling
- `script.js`: Game logic and mechanics
- TailwindCSS: Utility-first styling

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## Performance Considerations

- RequestAnimationFrame for smooth animations
- Optimized collision detection
- Efficient canvas rendering
- Minimal DOM manipulation

## Future Enhancements

Potential areas for improvement:
- Local storage for high scores
- Multiple game modes
- Sound effects
- Power-ups system
- Responsive canvas sizing 