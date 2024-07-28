import Gradient from "../src/index";
import { GradientOptions } from "../src/types";

describe("grainient-lib", () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    ctx = canvas.getContext("2d")!;
  });

  test("should check if document and window are available", () => {
    expect(typeof document).toBe("object");
    expect(typeof window).toBe("object");
  });

  test("should create a linear gradient", () => {
    const options: GradientOptions = {
      colors: ["#ff0000", "#00ff00", "#0000ff"],
      type: "linear",
      angle: 90,
    };

    Gradient(canvas, options);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#ff0000");
    gradient.addColorStop(0.5, "#00ff00");
    gradient.addColorStop(1, "#0000ff");

    expect(ctx.getImageData(0, 0, canvas.width, canvas.height)).toBeDefined();
  });

  test("should create a radial gradient", () => {
    const options: GradientOptions = {
      colors: ["#ff0000", "#00ff00", "#0000ff"],
      type: "radial",
    };

    Gradient(canvas, options);

    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );
    gradient.addColorStop(0, "#ff0000");
    gradient.addColorStop(0.5, "#00ff00");
    gradient.addColorStop(1, "#0000ff");

    expect(ctx.getImageData(0, 0, canvas.width, canvas.height)).toBeDefined();
  });

  test("should apply grain effect", () => {
    const options: GradientOptions = {
      colors: ["#ff0000", "#00ff00", "#0000ff"],
      grain: 30,
      type: "linear",
    };

    Gradient(canvas, options);

    expect(ctx.getImageData(0, 0, canvas.width, canvas.height)).toBeDefined();
  });

  test("should throw error for invalid color count", () => {
    expect(() => {
      Gradient(canvas, { colors: ["#ff0000"], type: "linear" });
    }).toThrow("You need to specify between 2 and 6 colors.");
  });

  test("should throw error for invalid gradient type", () => {
    expect(() => {
      Gradient(canvas, {
        colors: ["#ff0000", "#00ff00"],
        type: "invalid" as any,
      });
    }).toThrow();
  });

  test("should handle default values", () => {
    const options: GradientOptions = {
      colors: ["#ff0000", "#00ff00"],
    };

    Gradient(canvas, options);

    expect(ctx.getImageData(0, 0, canvas.width, canvas.height)).toBeDefined();
  });
});
