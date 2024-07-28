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
