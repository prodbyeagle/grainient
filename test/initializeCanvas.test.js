import { initializeCanvas } from '../src/index';
import { generateGradientWithGrain } from 'grainient.';

// Mock the `generateGradientWithGrain` function
jest.mock('grainient.', () => ({
  generateGradientWithGrain: jest.fn(),
}));

describe('initializeCanvas', () => {
  let canvas, context;

  beforeEach(() => {
    // Create a mock canvas and context
    canvas = document.createElement('canvas');

    // Mock the context object
    context = {
      // Add mock methods if needed
      fillRect: jest.fn(),
      // Other methods can be mocked as needed
      createLinearGradient: jest.fn().mockReturnValue({
        addColorStop: jest.fn(),
      }),
    };

    // Mock getContext method to return the mock context
    canvas.getContext = jest.fn().mockReturnValue(context);

    // Set canvas dimensions directly
    Object.defineProperty(canvas, 'width', {
      value: 500,
      writable: true,
    });
    Object.defineProperty(canvas, 'height', {
      value: 300,
      writable: true,
    });
  });

  test('should initialize the canvas with gradient and grain effect', () => {
    const color1 = '#ff0000';
    const color2 = '#0000ff';
    const grainIntensity = 0.5;

    // Call the function
    initializeCanvas(canvas, color1, color2, grainIntensity);

    // Check that the canvas dimensions are set
    expect(canvas.width).toBe(500);
    expect(canvas.height).toBe(300);

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
    }).toThrow('Colors must be strings.');

    expect(() => {
      initializeCanvas(canvas, '#ff0000', [], 0.5);
    }).toThrow('Colors must be strings.');
  });

  test('should throw error for invalid grain intensity', () => {
    expect(() => {
      initializeCanvas(canvas, '#ff0000', '#0000ff', -1);
    }).toThrow('Grain intensity must be a non-negative number.');

    expect(() => {
      initializeCanvas(canvas, '#ff0000', '#0000ff', 'string');
    }).toThrow('Grain intensity must be a non-negative number.');
  });
});