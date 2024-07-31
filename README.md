# Grainient

A simple and customizable gradient and grain effect library for HTML5 canvas.

## Installation

```bash
npm install @prodbyeagle/grainient
```

## Usage

### Basic Usage

To use the `grainient`, import it and call the `Gradient` function with the desired options.

```javascript
import { Gradient, applyGrain } from '@prodbyeagle/grainient';

// Select the canvas element
const canvas = document.getElementById('myCanvas');

// Define gradient options
const options = {
  colors: ['#ff0000', '#00ff00', '#0000ff'], // min: 2, max: 8
  grain: 20,  // Optional: add grain effect with intensity between 1 and 50
  type: 'linear',  // Optional: 'linear' or 'radial'
  angle: 45  // Optional: angle in degrees (default is 45 for linear gradients)
};

// Apply the gradient
Gradient(canvas, options);
```

### Gradient Types

- **Linear Gradient**: Gradients that transition along a straight line.
- **Radial Gradient**: Gradients that radiate outward from a central point.

### Example Code

#### Linear Gradient Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Linear Gradient Example</title>
</head>
<body>
  <canvas id="myCanvas" class="canvas-container"></canvas>
  <script type="module">
    import { Gradient } from '@prodbyeagle/grainient';

    const canvas = document.getElementById('myCanvas');
    const options = {
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      type: 'linear',  // Linear gradient
      angle: 90  // Horizontal gradient
    };

    Gradient(canvas, options);
  </script>
</body>
</html>
```

#### Radial Gradient Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Radial Gradient Example</title>
</head>
<body>
  <canvas id="myCanvas" class="canvas-container"></canvas>
  <script type="module">
    import { Gradient } from '@prodbyeagle/grainient';

    const canvas = document.getElementById('myCanvas');
    const options = {
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      type: 'radial'  // Radial gradient
    };

    Gradient(canvas, options);
  </script>
</body>
</html>
```

### Adding Grain Effect

The grain effect adds a noise-like texture to the gradient. You can adjust the intensity from 1 to 50.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Grain Effect Example</title>
</head>
<body>
  <canvas id="myCanvas" class="canvas-container"></canvas>
  <script type="module">
    import { Gradient, applyGrain } from '@prodbyeagle/grainient';

    const canvas = document.getElementById('myCanvas');
    const options = {
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      grain: 30,  // Add grain effect with intensity of 30
      type: 'linear',
      angle: 45
    };

    Gradient(canvas, options);
    applyGrain(canvas.getContext('2d'), canvas.width, canvas.height, 30);
  </script>
</body>
</html>
```

## Options

- `colors`: Array of color strings (e.g., `['#ff0000', '#00ff00']`). Must contain between 2 and 8 colors.
- `grain` (optional): Intensity of the grain effect (integer between 1 and 50). Default is `0` (no grain).
- `type` (optional): Type of gradient. Can be `'linear'` or `'radial'`. Default is `'linear'`.
- `angle` (optional): Angle in degrees for linear gradients (default is `45`).

## License

This project is licensed under the MIT License.

## Author

```
Created by @prodbyeagle 🦅
