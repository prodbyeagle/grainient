
```markdown
# Grainient

A library for generating gradients with grain effects on canvas.

## Installation

To install the library, run:

npm install grainient
```

## Usage

To use the library in your project, import and initialize it with your desired settings. Here’s an example of how to use the `initializeCanvas` function:

```javascript
import { generateGradientWithGrain } from 'grainient';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Generate a gradient with grain effect
generateGradientWithGrain(ctx, canvas.width, canvas.height, '#ff0000', '#0000ff', 10);
```

## API

### `initializeCanvas(canvas, color1, color2, grainIntensity, text, textSize)`

- **`canvas`**: The HTML canvas element to initialize.
- **`color1`**: The start color of the gradient (HEX color code, e.g., `#ff0000`).
- **`color2`**: The end color of the gradient (HEX color code, e.g., `#0000ff`).
- **`grainIntensity`**: The intensity of the grain effect (a number between 0 and 50).
- **`text`**: Optional. The text to draw on the canvas.
- **`textSize`**: Optional. The font size for the text in pixels (default is 40).

## Examples

### Basic Gradient

```javascript
import { generateGradientWithGrain } from 'grainient';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
generateGradientWithGrain(ctx, canvas.width, canvas.height, '#ff0000', '#0000ff', 10);
```

## License

MIT
```
Copyright (c) 2024 prodbyeagle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.