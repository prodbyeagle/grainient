import { applyGrain } from "../src/effects/applyGrain";

describe("applyGrain", () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    ctx = canvas.getContext("2d")!;
  });

  it("should apply a grain effect with default intensity", () => {
    applyGrain(ctx, canvas.width, canvas.height, 10);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Verify some pixels have been modified
    const hasGrain = data.some((value, index) => index % 4 !== 3 && value > 0);
    expect(hasGrain).toBe(true);
  });

  it("should apply a grain effect with maximum intensity", () => {
    applyGrain(ctx, canvas.width, canvas.height, 50);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Check that the alpha value is close to the maximum (255)
    const alphaValues = data.filter((_, index) => (index + 1) % 4 === 0);
    expect(alphaValues.every((alpha) => alpha >= 255 - 5)).toBe(true); // Tolerance of ±5

    // Optional: Log image data for manual inspection
    console.log("Grain effect with maximum intensity image data:", data);
  });

  it("should handle cases where context is not available", () => {
    const noContext: any = null;
    expect(() =>
      applyGrain(noContext, canvas.width, canvas.height, 10)
    ).not.toThrow();
  });
});
