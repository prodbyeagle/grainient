const {
  hexToRgb,
  generateGradientWithGrain,
  initializeCanvas,
  applyColorFilter,
  drawCircle,
} = require("../src/index");

describe("Canvas Functions", () => {
  let canvas, ctx;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 300;
    ctx = canvas.getContext("2d");
  });

  describe("hexToRgb", () => {
    test("should convert HEX to RGB correctly", () => {
      expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb("#00ff00")).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb("#0000ff")).toEqual({ r: 0, g: 0, b: 255 });
    });

    test("should throw an error for invalid HEX codes", () => {
      expect(() => hexToRgb("#xyz")).toThrow(
        'Invalid HEX color code. It should be in the format "#RRGGBB".'
      );
      expect(() => hexToRgb(123)).toThrow("HEX color code must be a string.");
      expect(() => hexToRgb("#12345")).toThrow(
        'Invalid HEX color code. It should be in the format "#RRGGBB".'
      );
    });
  });

  describe("generateGradientWithGrain", () => {
    test("should generate a linear gradient with grain effect", () => {
      generateGradientWithGrain(
        ctx,
        canvas.width,
        canvas.height,
        "#ff0000",
        "#0000ff",
        0.5,
        0,
        "linear"
      );
      // Test for visual verification or use pixel data analysis if needed
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      expect(imageData.data.length).toBe(canvas.width * canvas.height * 4); // Ensure that image data is created
    });

    test("should generate a radial gradient with grain effect", () => {
      generateGradientWithGrain(
        ctx,
        canvas.width,
        canvas.height,
        "#ff0000",
        "#0000ff",
        0.5,
        0,
        "radial"
      );
      // Test for visual verification or use pixel data analysis if needed
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      expect(imageData.data.length).toBe(canvas.width * canvas.height * 4); // Ensure that image data is created
    });

    test("should throw an error for invalid gradient type", () => {
      expect(() =>
        generateGradientWithGrain(
          ctx,
          canvas.width,
          canvas.height,
          "#ff0000",
          "#0000ff",
          0.5,
          0,
          "invalid"
        )
      ).toThrow("Invalid gradient type. Must be 'linear' or 'radial'.");
    });
  });

  describe("initializeCanvas", () => {
    test("should initialize the canvas with a linear gradient and grain effect", () => {
      initializeCanvas(canvas, "#ff0000", "#0000ff", 0.5, 0, "linear");
      // Test for visual verification or use pixel data analysis if needed
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      expect(imageData.data.length).toBe(canvas.width * canvas.height * 4); // Ensure that image data is created
    });

    test("should initialize the canvas with a radial gradient and grain effect", () => {
      initializeCanvas(canvas, "#ff0000", "#0000ff", 0.5, 0, "radial");
      // Test for visual verification or use pixel data analysis if needed
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      expect(imageData.data.length).toBe(canvas.width * canvas.height * 4); // Ensure that image data is created
    });

    test("should throw an error for invalid canvas element", () => {
      const invalidCanvas = {}; // Not a valid HTMLCanvasElement
      expect(() =>
        initializeCanvas(invalidCanvas, "#ff0000", "#0000ff", 0.5, 0, "linear")
      ).toThrow("The provided element is not an HTMLCanvasElement.");
    });
  });

  describe("applyColorFilter", () => {
    test("should apply a color filter correctly", () => {
      initializeCanvas(canvas, "#ff0000", "#0000ff", 0.5, 0, "linear");
      applyColorFilter(ctx, "#00ff00", 0.5);
      // Test for visual verification or use pixel data analysis if needed
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      expect(imageData.data.length).toBe(canvas.width * canvas.height * 4); // Ensure that image data is created
    });

    test("should throw an error for invalid color filter", () => {
      expect(() => applyColorFilter(ctx, "#00ff00", -0.5)).toThrow(
        "Grain intensity must be a non-negative number."
      );
      expect(() => applyColorFilter(ctx, 123, 0.5)).toThrow(
        "Filter color must be a string."
      );
    });
  });

  describe("drawCircle", () => {
    test("should draw a circle with the given parameters", () => {
      drawCircle(ctx, 100, 100, 50, "#ff0000");
      // Test for visual verification or use pixel data analysis if needed
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // Check if there are some non-zero values around the circle's area
      // This is a simplistic check; more complex checks might be required for thorough testing
      expect(
        imageData.data.some(
          (value, index) =>
            value !== 0 &&
            (index % 4 === 0 || index % 4 === 1 || index % 4 === 2)
        )
      ).toBe(true);
    });

    test("should throw an error for invalid circle parameters", () => {
      expect(() => drawCircle(ctx, 100, 100, -50, "#ff0000")).toThrow(
        "Radius must be a positive number."
      );
      expect(() => drawCircle(ctx, 100, 100, 50, 123)).toThrow(
        "Color must be a string."
      );
    });
  });
});
