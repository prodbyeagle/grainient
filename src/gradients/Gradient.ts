import { applyGrain } from "../effects/applyGrain";
import { GradientOptions } from "../types/GradientOptions";

/**
 * Creates a gradient on the given canvas element.
 *
 * @param canvas - The canvas element to apply the gradient to.
 * @param options - The options for the gradient.
 */
export function Gradient(canvas: HTMLCanvasElement, options: GradientOptions) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context is not available.");

  const { colors, grain = 0, type = "linear", angle = 45 } = options;

  if (colors.length < 2 || colors.length > 8)
    throw new Error("You need to specify between 2 and 8 colors.");
  if (!["linear", "radial"].includes(type))
    throw new Error('Gradient type must be "linear" or "radial".');
  if (
    type === "linear" &&
    (typeof angle !== "number" || angle < 0 || angle > 90)
  )
    throw new Error(
      "Angle must be a number between 0 and 90 for linear gradients."
    );

  let gradient;
  if (type === "linear") {
    const x1 = canvas.width * Math.cos((angle * Math.PI) / 180);
    const y1 = canvas.height * Math.sin((angle * Math.PI) / 180);
    gradient = ctx.createLinearGradient(0, 0, x1, y1);
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

  const step = 1 / (colors.length - 1);
  colors.forEach((color, index) => gradient.addColorStop(index * step, color));

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (grain > 0) {
    applyGrain(ctx, canvas.width, canvas.height, grain);
  }
}
