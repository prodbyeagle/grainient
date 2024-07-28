// src/utils.ts

export function applyGrain(ctx: CanvasRenderingContext2D, width: number, height: number, intensity: number) {
  ctx.globalCompositeOperation = 'overlay';
  const grainCanvas = document.createElement('canvas');
  grainCanvas.width = width;
  grainCanvas.height = height;
  const grainCtx = grainCanvas.getContext('2d');

  if (!grainCtx) {
    throw new Error('Could not get context for grain canvas');
  }

  grainCtx.fillStyle = `rgba(0, 0, 0, ${intensity / 100})`;
  grainCtx.fillRect(0, 0, width, height);

  ctx.drawImage(grainCanvas, 0, 0);
}
