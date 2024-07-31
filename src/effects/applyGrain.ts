/**
 * Applies a "grain" effect to a CanvasRenderingContext2D.
 *
 * @param ctx - The CanvasRenderingContext2D to which the grain effect will be applied.
 * @param width - The width of the canvas.
 * @param height - The height of the canvas.
 * @param intensity - The intensity of the grain effect, ranging from 0 (no grain) to 50 (maximum grain).
 */
export function applyGrain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number
) {
  // Create a temporary canvas for the grain effect
  const grainCanvas = document.createElement("canvas");
  grainCanvas.width = width;
  grainCanvas.height = height;
  const grainCtx = grainCanvas.getContext("2d");

  if (!grainCtx) {
    console.error("Failed to get 2D context from grainCanvas.");
    return;
  }

  // Create image data for the grain effect
  const imageData = grainCtx.createImageData(width, height);
  const data = imageData.data;

  // Apply random grain effect to each pixel
  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255; // Random color value
    data[i] = data[i + 1] = data[i + 2] = value; // RGB
    data[i + 3] = intensity * 2.55; // Alpha
  }

  grainCtx.putImageData(imageData, 0, 0);

  // Apply the grain effect to the target context
  ctx.globalCompositeOperation = "overlay"; // Try other operations if needed
  ctx.drawImage(grainCanvas, 0, 0);
  ctx.globalCompositeOperation = "source-over"; // Reset operation to default
}
