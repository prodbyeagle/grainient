import { Gradient } from "../src/gradients/Gradient";
import { GradientOptions } from "../src/types/GradientOptions";

describe("Gradient", () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    ctx = canvas.getContext("2d")!;
  });

  it("should create a linear gradient", () => {
    const options: GradientOptions = {
      colors: ["#ff0000", "#0000ff"],
      type: "linear",
      angle: 45,
      grain: 0,
    };

    Gradient(canvas, options);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Verify that some pixel data is non-zero
    const hasGradient = data.some(
      (value, index) => index % 4 !== 3 && value !== 0
    );
    expect(hasGradient).toBe(true);
  });

  it("should throw an error for invalid gradient type", () => {
    const options: GradientOptions = {
      colors: ["#ff0000", "#0000ff"],
      type: "invalid" as any,
      angle: 45,
      grain: 0,
    };

    expect(() => Gradient(canvas, options)).toThrow(
      'Gradient type must be "linear" or "radial".'
    );
  });

  it("should throw an error for invalid angle", () => {
    const options: GradientOptions = {
      colors: ["#ff0000", "#0000ff"],
      type: "linear",
      angle: 100,
      grain: 0,
    };

    expect(() => Gradient(canvas, options)).toThrow(
      "Angle must be a number between 0 and 90 for linear gradients."
    );
  });

  it("should apply grain effect if specified", () => {
    const options: GradientOptions = {
      colors: ["#ff0000", "#0000ff"],
      type: "linear",
      angle: 45,
      grain: 10,
    };

    Gradient(canvas, options);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Verify that some pixel data is non-zero
    const hasGrain = data.some(
      (value, index) => index % 4 !== 3 && value !== 0
    );
    expect(hasGrain).toBe(true);
  });

  it("should throw an error if less than 2 colors are provided", () => {
    const options: GradientOptions = {
      colors: ["#ff0000"],
      type: "linear",
      angle: 45,
      grain: 0,
    };

    expect(() => Gradient(canvas, options)).toThrow(
      "You need to specify between 2 and 8 colors."
    );
  });
});
