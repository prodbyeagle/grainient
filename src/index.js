import { generateGradientWithGrain } from './gradient';

/**
 * Initializes a canvas with a gradient and optional grain effect.
 * @param {HTMLCanvasElement} canvas - The canvas element to initialize.
 * @param {string} color1 - The start color (HEX).
 * @param {string} color2 - The end color (HEX).
 * @param {number} grainIntensity - The intensity of the grain effect.
 * @throws {Error} - If invalid input values are provided.
 */
export function initializeCanvas(canvas, color1, color2, grainIntensity) {
    // Validate input values
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error('The provided element is not an HTMLCanvasElement.');
    }

    if (typeof color1 !== 'string' || typeof color2 !== 'string') {
        throw new Error('Color must be a string.');
    }

    if (typeof grainIntensity !== 'number' || grainIntensity < 0) {
        throw new Error('grainIntensity must be a non-negative number.');
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not retrieve context from the canvas element.');
    }

    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Generate gradient and grain effect
    generateGradientWithGrain(ctx, canvas.width, canvas.height, color1, color2, grainIntensity);
}
