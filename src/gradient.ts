// src/gradient.ts
/**
 * Applies a "grain" effect to a CanvasRenderingContext2D.
 *
 * This function creates an additional canvas element filled with a semi-transparent black color.
 * This effect is then overlaid onto the current CanvasRenderingContext2D to create a grainy appearance.
 * The degree of graininess is controlled by the intensity parameter.
 *
 * @param ctx - The CanvasRenderingContext2D to which the grain effect will be applied.
 * @param width - The width of the canvas on which the effect will be applied.
 * @param height - The height of the canvas on which the effect will be applied.
 * @param intensity - The intensity of the grain effect, ranging from 0 (no grain) to 100 (maximum grain).
 *                    This value determines the transparency of the black overlay on the canvas.
 *
 * @throws {Error} If the context for the temporary grain canvas cannot be retrieved.
 */
export function applyGrain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number
) {
  // Set the global composite operation to 'overlay' to add the grain effect.
  ctx.globalCompositeOperation = "overlay";

  // Create a new canvas element for the grain effect.
  const grainCanvas = document.createElement("canvas");
  grainCanvas.width = width;
  grainCanvas.height = height;
  const grainCtx = grainCanvas.getContext("2d");

  // Check if the context for the new canvas was successfully retrieved.
  if (!grainCtx) {
    throw new Error("Could not get context for grain canvas");
  }

  // Set the fill style of the grain canvas to a semi-transparent black color,
  // where the intensity determines the alpha value of the color.
  grainCtx.fillStyle = `rgba(0, 0, 0, ${intensity / 100})`;
  grainCtx.fillRect(0, 0, width, height);

  // Draw the grain canvas onto the original canvas.
  ctx.drawImage(grainCanvas, 0, 0);
}


/**
 * Configuration options for a gradient.
 */
export type GradientOptions = {
  /**
   * An array of color values to be used in the gradient.
   * Each color should be a valid CSS color string.
   */
  colors: string[];

  /**
   * The amount of noise or graininess to apply to the gradient.
   * This value is optional.
   * @default 0
   */
  grain?: number;

  /**
   * The type of gradient to apply.
   * Can be either 'linear' for a linear gradient or 'radial' for a radial gradient.
   * This value is optional.
   * @default 'linear'
   */
  type?: "linear" | "radial";

  /**
   * The angle of the gradient, applicable only for linear gradients.
   * This value is optional and should be a number representing the angle in degrees.
   * @default 0
   */
  angle?: number;
};


/**
 * Creates a gradient on the given canvas element.
 *
 * @param canvas - The canvas element to apply the gradient to.
 * @param options - The options for the gradient.
 * @throws Will throw an error if the canvas context is not available.
 * @throws Will throw an error if the number of colors is less than 2 or more than 6.
 */
export default function Gradient(
  canvas: HTMLCanvasElement,
  options: GradientOptions
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context is not available");
  }

  const { colors, grain = 0, type = "linear", angle = 45 } = options;

  if (colors.length < 2 || colors.length > 6) {
    throw new Error("You need to specify between 2 and 6 colors.");
  }

  const gradient =
    type === "linear"
      ? ctx.createLinearGradient(
          0,
          0,
          canvas.width * Math.cos((angle * Math.PI) / 180),
          canvas.height * Math.sin((angle * Math.PI) / 180)
        )
      : ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2
        );

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
