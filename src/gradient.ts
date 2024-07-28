/**
 * Applies a "grain" effect to a CanvasRenderingContext2D.
 *
 * @param ctx - The CanvasRenderingContext2D to which the grain effect will be applied.
 * @param width - The width of the canvas on which the effect will be applied.
 * @param height - The height of the canvas on which the effect will be applied.
 * @param intensity - The intensity of the grain effect, ranging from 0 (no grain) to 50 (maximum grain).
 *
 * @throws {Error} If the context for the temporary grain canvas cannot be retrieved.
 */
export function applyGrain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number
) {
  if (intensity < 0 || intensity > 50) {
    throw new Error("Intensity must be between 0 and 50.");
  }

  // Set the global composite operation to 'overlay' to add the grain effect.
  ctx.globalCompositeOperation = "overlay";

  // Create a new canvas element for the grain effect.
  const grainCanvas = document.createElement("canvas");
  grainCanvas.width = width;
  grainCanvas.height = height;
  const grainCtx = grainCanvas.getContext("2d");

  // Check if the context for the new canvas was successfully retrieved.
  if (!grainCtx) {
    throw new Error("Could not get context for grain canvas.");
  }

  // Set the fill style of the grain canvas to a semi-transparent black color,
  // where the intensity determines the alpha value of the color.
  grainCtx.fillStyle = `rgba(0, 0, 0, ${Math.min(intensity / 50, 1)})`;
  grainCtx.fillRect(0, 0, width, height);

  // Draw the grain canvas onto the original canvas.
  ctx.drawImage(grainCanvas, 0, 0);

  // Reset globalCompositeOperation to default
  ctx.globalCompositeOperation = "source-over";
}

/**
 * Configuration options for a gradient.
 */
export type GradientOptions = {
  colors: string[];
  grain?: number;
  type?: "linear" | "radial";
  angle?: number;
};

/**
 * Creates a gradient on the given canvas element.
 *
 * @param canvas - The canvas element to apply the gradient to.
 * @param options - The options for the gradient.
 *
 * @throws Will throw an error if the canvas context is not available.
 * @throws Will throw an error if the number of colors is less than 2 or more than 6.
 * @throws Will throw an error if an invalid gradient type or angle is provided.
 */
export default function Gradient(
  canvas: HTMLCanvasElement,
  options: GradientOptions
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context is not available.");
  }

  const { colors, grain = 0, type = "linear", angle = 45 } = options;

  if (colors.length < 2 || colors.length > 6) {
    throw new Error("You need to specify between 2 and 6 colors.");
  }

  if (!["linear", "radial"].includes(type)) {
    throw new Error('Gradient type must be "linear" or "radial".');
  }

  if (
    type === "linear" &&
    (typeof angle !== "number" || angle < 0 || angle > 360)
  ) {
    throw new Error(
      "Angle must be a number between 0 and 360 for linear gradients."
    );
  }

  let gradient;
  if (type === "linear") {
    const x0 = 0;
    const y0 = 0;
    const x1 = canvas.width * Math.cos((angle * Math.PI) / 180);
    const y1 = canvas.height * Math.sin((angle * Math.PI) / 180);
    gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  } else {
    gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );
  }

  // Add color stops
  const step = 1 / (colors.length - 1);
  colors.forEach((color, index) => {
    gradient.addColorStop(index * step, color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (grain > 0) {
    applyGrain(ctx, canvas.width, canvas.height, grain);
  }
}
