import { initializeCanvas } from '../src/index';
import { generateGradientWithGrain } from 'grainient.';

// Mock the `generateGradientWithGrain` function
jest.mock('grainient', () => ({
  generateGradientWithGrain: jest.fn(),
}));

describe('initializeCanvas', () => {
  let canvas, context;

  beforeEach(() => {
    // Create a mock canvas and context
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    canvas.clientWidth = 500;
    canvas.clientHeight = 300;
  });

  test('should initialize the canvas with gradient and grain effect', () => {
    const color1 = '#ff0000';
    const color2 = '#0000ff';
    const grainIntensity = 0.5;

    // Call the function
    initializeCanvas(canvas, color1, color2, grainIntensity);

    // Check that the canvas dimensions are set
    expect(canvas.width).toBe(canvas.clientWidth);
    expect(canvas.height).toBe(canvas.clientHeight);

    // Check that `generateGradientWithGrain` was called with the correct arguments
    expect(generateGradientWithGrain).toHaveBeenCalledWith(
      context,
      canvas.width,
      canvas.height,
      color1,
      color2,
      grainIntensity
    );
  });

  test('should throw error for invalid canvas element', () => {
    const invalidCanvas = {}; // Not an HTMLCanvasElement

    expect(() => {
      initializeCanvas(invalidCanvas, '#ff0000', '#0000ff', 0.5);
    }).toThrow('The provided element is not an HTMLCanvasElement.');
  });

  test('should throw error for invalid color values', () => {
    expect(() => {
      initializeCanvas(canvas, 123, '#0000ff', 0.5);
    }).toThrow('Color must be a string.');

    expect(() => {
      initializeCanvas(canvas, '#ff0000', [], 0.5);
    }).toThrow('Color must be a string.');
  });

  test('should throw error for invalid grain intensity', () => {
    expect(() => {
      initializeCanvas(canvas, '#ff0000', '#0000ff', -1);
    }).toThrow('grainIntensity must be a non-negative number.');

    expect(() => {
      initializeCanvas(canvas, '#ff0000', '#0000ff', 'string');
    }).toThrow('grainIntensity must be a non-negative number.');
  });
});
