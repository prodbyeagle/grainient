/**
 * Converts a HEX color code to RGB format.
 *
 * @param {string} hex - The HEX color code in the format "#RRGGBB".
 * @returns {Object} - An object with properties r, g, and b representing the red, green, and blue values.
 * @throws {Error} - Throws an error if the input is not a valid HEX color code.
 */
export function hexToRgb(hex) {
  console.log("hexToRgb called with:", hex);

  if (typeof hex !== "string") {
    throw new Error("HEX color code must be a string.");
  }
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error(
      'Invalid HEX color code. It should be in the format "#RRGGBB".'
    );
  }

  const rgb = {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };

  console.log("Converted RGB:", rgb);
  return rgb;
}

/**
 * Generates a gradient with a grain effect on a given 2D canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of a canvas element.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 * @param {string} color1 - The starting color of the gradient in HEX format.
 * @param {string} color2 - The ending color of the gradient in HEX format.
 * @param {number} grainIntensity - The intensity of the grain effect (non-negative number).
 * @param {number} angle - The angle of the gradient in degrees.
 * @param {string} type - The type of gradient ("linear" or "radial").
 * @throws {Error} - Throws an error if any of the parameters are invalid.
 */
export function generateGradientWithGrain(
  ctx,
  width,
  height,
  color1,
  color2,
  grainIntensity,
  angle = 0,
  type = "linear"
) {
  console.log("generateGradientWithGrain called with:", {
    width,
    height,
    color1,
    color2,
    grainIntensity,
    angle,
    type,
  });

  // Create gradient
  let gradient;
  if (type === "linear") {
    const x2 = width * Math.cos((angle * Math.PI) / 180);
    const y2 = height * Math.sin((angle * Math.PI) / 180);
    gradient = ctx.createLinearGradient(0, 0, x2, y2);
  } else {
    gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      Math.sqrt(width ** 2 + height ** 2) / 2
    );
  }

  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  // Fill gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Apply grain effect
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    // Apply grain effect
    data[i] += (Math.random() - 0.5) * grainIntensity; // red
    data[i + 1] += (Math.random() - 0.5) * grainIntensity; // green
    data[i + 2] += (Math.random() - 0.5) * grainIntensity; // blue
  }

  // Limit the color values to the range [0, 255]
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.max(0, Math.min(255, data[i])); // red
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1])); // green
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2])); // blue
  }

  ctx.putImageData(imageData, 0, 0);
  console.log("Gradient and grain effect applied.");
}

/**
 * Initializes the canvas with a gradient and grain effect.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element to be initialized.
 * @param {string} color1 - The starting color of the gradient in HEX format.
 * @param {string} color2 - The ending color of the gradient in HEX format.
 * @param {number} grainIntensity - The intensity of the grain effect (non-negative number).
 * @param {number} angle - The angle of the gradient in degrees.
 * @param {string} type - The type of gradient ("linear" or "radial").
 * @throws {Error} - Throws an error if the canvas is not an HTMLCanvasElement or if the context cannot be retrieved.
 */
export function initializeCanvas(
  canvas,
  color1,
  color2,
  grainIntensity,
  angle = 0,
  type = "linear"
) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("The provided element is not an HTMLCanvasElement.");
  }

  if (typeof color1 !== "string" || typeof color2 !== "string") {
    throw new Error("Colors must be strings.");
  }

  if (typeof grainIntensity !== "number" || grainIntensity < 0) {
    throw new Error("Grain intensity must be a non-negative number.");
  }

  if (typeof angle !== "number") {
    throw new Error("Angle must be a number.");
  }

  if (type !== "linear" && type !== "radial") {
    throw new Error('Gradient type must be "linear" or "radial".');
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not retrieve context from the canvas element.");
  }

  // Ensure the width and height are positive
  if (canvas.width <= 0 || canvas.height <= 0) {
    throw new Error("Width and height must be positive numbers.");
  }

  // Generate the gradient and apply grain effect
  generateGradientWithGrain(
    ctx,
    canvas.width,
    canvas.height,
    color1,
    color2,
    grainIntensity,
    angle,
    type
  );
}
