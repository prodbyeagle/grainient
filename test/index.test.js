const {
  hexToRgb,
  generateGradientWithGrain,
  initializeCanvas,
} = require("../src/index");

describe("hexToRgb", () => {
  test("should convert HEX to RGB correctly", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("#00ff00")).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb("#0000ff")).toEqual({ r: 0, g: 0, b: 255 });
  });

  test("should throw an error for invalid HEX codes", () => {
    expect(() => hexToRgb("ff0000")).toThrow(
      'Invalid HEX color code. It should be in the format "#RRGGBB".'
    );
    expect(() => hexToRgb("#xyz")).toThrow(
      'Invalid HEX color code. It should be in the format "#RRGGBB".'
    );
    expect(() => hexToRgb("#ff000")).toThrow(
      'Invalid HEX color code. It should be in the format "#RRGGBB".'
    );
  });
});

describe("generateGradientWithGrain", () => {
  let canvas, ctx;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");

    // Mock methods on the context
    jest.spyOn(ctx, "createLinearGradient").mockImplementation(() => ({
      addColorStop: jest.fn(),
    }));
    jest.spyOn(ctx, "fillRect").mockImplementation(() => {});
    jest.spyOn(ctx, "putImageData").mockImplementation(() => {});
  });

  test("should generate gradient and apply grain effect", () => {
    generateGradientWithGrain(ctx, 500, 300, "#ff0000", "#0000ff", 0.5);

    expect(ctx.createLinearGradient).toHaveBeenCalledWith(0, 0, 500, 300);
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 500, 300);
  });

  test("should throw errors for invalid input", () => {
    expect(() =>
      generateGradientWithGrain(ctx, -500, 300, "#ff0000", "#0000ff", 0.5)
    ).toThrow("Width must be a positive number.");
    expect(() =>
      generateGradientWithGrain(ctx, 500, -300, "#ff0000", "#0000ff", 0.5)
    ).toThrow("Height must be a positive number.");
    expect(() =>
      generateGradientWithGrain(ctx, 500, 300, 123, "#0000ff", 0.5)
    ).toThrow("Colors must be strings.");
    expect(() =>
      generateGradientWithGrain(ctx, 500, 300, "#ff0000", "#0000ff", -0.5)
    ).toThrow("Grain intensity must be a non-negative number.");
  });
});

describe("initializeCanvas", () => {
  let canvas, ctx;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 300;

    // Set up context and mock methods
    ctx = canvas.getContext("2d");
    jest.spyOn(ctx, "createLinearGradient").mockImplementation(() => ({
      addColorStop: jest.fn(),
    }));
    jest.spyOn(ctx, "fillRect").mockImplementation(() => {});
    jest.spyOn(ctx, "putImageData").mockImplementation(() => {});
    jest
      .spyOn(require("../src/index"), "generateGradientWithGrain")
      .mockImplementation(() => {});
  });

  test("should initialize the canvas with gradient and grain effect", () => {
    initializeCanvas(canvas, "#ff0000", "#0000ff", 0.5);

    const { generateGradientWithGrain } = require("../src/index");
    expect(generateGradientWithGrain).toHaveBeenCalledWith(
      ctx,
      canvas.width,
      canvas.height,
      "#ff0000",
      "#0000ff",
      0.5
    );
  });

  test("should throw errors for invalid input", () => {
    expect(() => initializeCanvas({}, "#ff0000", "#0000ff", 0.5)).toThrow(
      "The provided element is not an HTMLCanvasElement."
    );

    expect(() => {
      canvas.getContext = () => null; // Simulate the absence of context
      initializeCanvas(canvas, "#ff0000", "#0000ff", 0.5);
    }).toThrow("Could not retrieve context from the canvas element.");

    expect(() => initializeCanvas(canvas, "#ff0000", "#0000ff", -0.5)).toThrow(
      "Grain intensity must be a non-negative number."
    );
  });
});
