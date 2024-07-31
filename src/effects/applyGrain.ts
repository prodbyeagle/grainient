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
  const grainCanvas = document.createElement("canvas");
  grainCanvas.width = width;
  grainCanvas.height = height;
  const grainCtx = grainCanvas.getContext("2d");

  if (!grainCtx) return;

  const imageData = grainCtx.createImageData(width, height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255;
    data[i] = data[i + 1] = data[i + 2] = value;
    data[i + 3] = intensity * 2.55;
  }
  grainCtx.putImageData(imageData, 0, 0);

  ctx.globalCompositeOperation = "overlay";
  ctx.drawImage(grainCanvas, 0, 0);
  ctx.globalCompositeOperation = "source-over";
}
