/**
 * Converts a HEX color code to an RGB color object.
 * @param {string} hex - The HEX color code (e.g., #ff0000).
 * @returns {object} RGB color object with r, g, b properties.
 * @throws {Error} Throws an error if the HEX code is invalid.
 */
function hexToRgb(hex) {
    if (typeof hex !== 'string') {
        throw new Error('HEX color code must be a string.');
    }

    // Ensure the HEX code starts with '#' and is followed by exactly 6 hexadecimal digits
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        throw new Error('Invalid HEX color code. It should be in the format "#RRGGBB".');
    }

    return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16),
    };
}

/**
 * Generates a gradient with a grain effect and draws it on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 * @param {string} color1 - The start color (HEX).
 * @param {string} color2 - The end color (HEX).
 * @param {number} grainIntensity - The intensity of the grain effect.
 * @throws {Error} Throws errors if any input parameters are invalid.
 */
function generateGradientWithGrain(ctx, width, height, color1, color2, grainIntensity) {
    if (!(ctx instanceof CanvasRenderingContext2D)) {
        throw new Error('The provided context is not a valid CanvasRenderingContext2D.');
    }

    if (typeof width !== 'number' || width <= 0) {
        throw new Error('Width must be a positive number.');
    }

    if (typeof height !== 'number' || height <= 0) {
        throw new Error('Height must be a positive number.');
    }

    if (typeof color1 !== 'string' || typeof color2 !== 'string') {
        throw new Error('Colors must be strings.');
    }

    if (typeof grainIntensity !== 'number' || grainIntensity < 0) {
        throw new Error('Grain intensity must be a non-negative number.');
    }

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Convert HEX colors to RGB
    const startColor = hexToRgb(color1);
    const endColor = hexToRgb(color2);

    // Generate gradient
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const t = x / width; // Gradient position
            const r = Math.floor(startColor.r * (1 - t) + endColor.r * t);
            const g = Math.floor(startColor.g * (1 - t) + endColor.g * t);
            const b = Math.floor(startColor.b * (1 - t) + endColor.b * t);
            const index = (y * width + x) * 4;

            data[index] = r;     // Red
            data[index + 1] = g; // Green
            data[index + 2] = b; // Blue
            data[index + 3] = 255; // Alpha (opaque)
        }
    }

    // Apply grain effect
    for (let i = 0; i < data.length; i += 4) {
        const grain = Math.random() * grainIntensity - (grainIntensity / 2);
        data[i] = Math.min(255, Math.max(0, data[i] + grain));        // Red
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain)); // Green
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain)); // Blue
    }

    ctx.putImageData(imageData, 0, 0);
}

/**
 * Initializes a canvas with a gradient and optional grain effect.
 * @param {HTMLCanvasElement} canvas - The canvas element to initialize.
 * @param {string} color1 - The start color (HEX).
 * @param {string} color2 - The end color (HEX).
 * @param {number} grainIntensity - The intensity of the grain effect.
 * @throws {Error} Throws errors if invalid input values are provided.
 */
function initializeCanvas(canvas, color1, color2, grainIntensity) {
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error('The provided element is not an HTMLCanvasElement.');
    }

    if (typeof color1 !== 'string' || typeof color2 !== 'string') {
        throw new Error('Colors must be strings.');
    }

    if (typeof grainIntensity !== 'number' || grainIntensity < 0) {
        throw new Error('Grain intensity must be a non-negative number.');
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not retrieve context from the canvas element.');
    }

    // Set canvas dimensions based on client size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Generate gradient and apply grain effect
    generateGradientWithGrain(ctx, canvas.width, canvas.height, color1, color2, grainIntensity);
}

module.exports = {
    initializeCanvas,
    generateGradientWithGrain
};