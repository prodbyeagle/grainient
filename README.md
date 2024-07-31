# Grainient

**Grainient** is a handy library for adding cool gradient and grain effects to your HTML5 canvas.

## Installation

Get started by installing Grainient with npm:

```bash
npm install @prodbyeagle/grainient
```

## Usage

### Basic Usage

To use Grainient, import the functions and call the `Gradient` function with your desired options:

```javascript
import { Gradient } from '@prodbyeagle/grainient';

// Get your canvas element
const canvas = document.getElementById('myCanvas');

// Set up your gradient options
const options = {
  colors: ['#ff0000', '#00ff00', '#0000ff'], // Minimum 2, maximum 8 colors
  grain: 20,  // Optional: Add grain effect with intensity between 0 and 50
  type: 'linear',  // Optional: 'linear' or 'radial'
  angle: 45  // Optional: Angle in degrees (default is 45 for linear gradients)
};

// Apply the gradient
Gradient(canvas, options);
```

### Gradient Types

- **Linear Gradient**: Smooth transition along a straight line.
- **Radial Gradient**: Transitions from a central point outward.

### Examples

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

You can add a grainy texture to your gradient using the `applyGrain` function:

```javascript
import { applyGrain } from '@prodbyeagle/grainient';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

if (ctx) {
  applyGrain(ctx, canvas.width, canvas.height, 20); // Intensity from 0 to 50
}
```

## Options

- **`colors`**: An array of color strings (e.g., `['#ff0000', '#00ff00']`). Must have between 2 and 8 colors.
- **`grain`** (optional): Intensity of the grain effect (integer from 0 to 50). Default is `0` (no grain).
- **`type`** (optional): Gradient type. Can be `'linear'` or `'radial'`. Default is `'linear'`.
- **`angle`** (optional): Angle for linear gradients in degrees (default is `45`).

## Demo

Check out a live demo of Grainient in action here: [Grainient Demo](https://prodbyeagle.github.io/grainient/#try-it). Play around with the settings and see how Grainient works!

## License

This project is licensed under the MIT License.

## Author

Created by @prodbyeagle 🦅

---