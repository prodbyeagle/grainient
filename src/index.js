/**
 * Converts a HEX color to RGB.
 * @param {string} hex - The HEX color code (e.g., #ff0000).
 * @returns {object} RGB color object with r, g, b properties.
 */
function hexToRgb(hex) {
    return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16)
    };
}

/**
 * Generates a gradient with grain effect on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 * @param {string} color1 - The start color (HEX).
 * @param {string} color2 - The end color (HEX).
 * @param {number} grainIntensity - The intensity of the grain effect.
 */
function generateGradientWithGrain(ctx, width, height, color1, color2, grainIntensity) {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const t = x / width;
            const r = Math.floor(c1.r * (1 - t) + c2.r * t);
            const g = Math.floor(c1.g * (1 - t) + c2.g * t);
            const b = Math.floor(c1.b * (1 - t) + c2.b * t);
            const index = (y * width + x) * 4;

            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = 255;
        }
    }

    for (let i = 0; i < data.length; i += 4) {
        const grain = Math.random() * grainIntensity - (grainIntensity / 2);
        data[i] = Math.min(255, Math.max(0, data[i] + grain));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain));
    }

    ctx.putImageData(imageData, 0, 0);
}

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