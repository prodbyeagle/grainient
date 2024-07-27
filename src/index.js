// Converts HEX color code to RGB format
function hexToRgb(hex) {
  if (typeof hex !== "string") {
    throw new Error("HEX color code must be a string.");
  }
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error(
      'Invalid HEX color code. It should be in the format "#RRGGBB".'
    );
  }

  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

// Generates a gradient with a grain effect on a given 2D canvas context
function generateGradientWithGrain(
  ctx,
  width,
  height,
  color1,
  color2,
  grainIntensity
) {
  if (!(ctx instanceof CanvasRenderingContext2D)) {
    throw new Error(
      "The provided context is not a valid CanvasRenderingContext2D."
    );
  }

  if (typeof width !== "number" || width <= 0) {
    throw new Error("Width must be a positive number.");
  }

  if (typeof height !== "number" || height <= 0) {
    throw new Error("Height must be a positive number.");
  }

  if (typeof color1 !== "string" || typeof color2 !== "string") {
    throw new Error("Colors must be strings.");
  }

  if (typeof grainIntensity !== "number" || grainIntensity < 0) {
    throw new Error("Grain intensity must be a non-negative number.");
  }

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Apply grain effect (simple example)
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] += (Math.random() - 0.5) * grainIntensity; // red
    data[i + 1] += (Math.random() - 0.5) * grainIntensity; // green
    data[i + 2] += (Math.random() - 0.5) * grainIntensity; // blue
  }

  ctx.putImageData(imageData, 0, 0);
}

function initializeCanvas(canvas, startColor, endColor, grainIntensity) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("The provided element is not an HTMLCanvasElement.");
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not retrieve context from the canvas element.");
  }

  if (!(ctx instanceof CanvasRenderingContext2D)) {
    throw new Error("The provided context is not a valid CanvasRenderingContext2D.");
  }

  if (typeof grainIntensity !== 'number' || grainIntensity < 0) {
    throw new Error("Grain intensity must be a non-negative number.");
  }

  generateGradientWithGrain(ctx, canvas.width, canvas.height, startColor, endColor, grainIntensity);
}

module.exports = {
  hexToRgb,
  generateGradientWithGrain,
  initializeCanvas,
};
