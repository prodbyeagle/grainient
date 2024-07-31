import { applyAnimatedGrain } from "./applyAnimatedGrain";

/**
 * Creates an animated grain effect on a given canvas element.
 *
 * @param canvas - The canvas element.
 * @param grainIntensity - The intensity of the grain effect.
 * @param animationSpeed - The speed of the animation.
 */
export function applyAnimatedGrainEffect(
  canvas: HTMLCanvasElement,
  grainIntensity: number,
  animationSpeed: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get 2D context from the canvas.");
    return;
  }

  const { width, height } = canvas;

  function animate() {
    if (ctx) {
      // Ensure ctx is still valid
      applyAnimatedGrain(ctx, width, height, grainIntensity, animationSpeed);
    }
    requestAnimationFrame(animate);
  }

  animate();
}
