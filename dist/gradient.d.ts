/**
 * Applies a "grain" effect to a CanvasRenderingContext2D.
 *
 * @param ctx - The CanvasRenderingContext2D to which the grain effect will be applied.
 * @param width - The width of the canvas on which the effect will be applied.
 * @param height - The height of the canvas on which the effect will be applied.
 * @param intensity - The intensity of the grain effect, ranging from 0 (no grain) to 50 (maximum grain).
 */
export declare function applyGrain(ctx: CanvasRenderingContext2D, width: number, height: number, intensity: number): void;
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
export default function Gradient(canvas: HTMLCanvasElement, options: GradientOptions): void;
