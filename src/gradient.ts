// src/gradient.ts

import { GradientOptions } from "./types";
import { applyGrain } from "./utils";

/**
 * Creates a gradient on the given canvas element.
 *
 * @param canvas - The canvas element to apply the gradient to.
 * @param options - The options for the gradient.
 * @throws Will throw an error if the canvas context is not available.
 * @throws Will throw an error if the number of colors is less than 2 or more than 6.
 */
export default function Gradient(
  canvas: HTMLCanvasElement,
  options: GradientOptions
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context is not available");
  }

  const { colors, grain = 0, type = "linear", angle = 45 } = options;

  if (colors.length < 2 || colors.length > 6) {
    throw new Error("You need to specify between 2 and 6 colors.");
  }

  const gradient =
    type === "linear"
      ? ctx.createLinearGradient(
          0,
          0,
          canvas.width * Math.cos((angle * Math.PI) / 180),
          canvas.height * Math.sin((angle * Math.PI) / 180)
        )
      : ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2
        );

  // Add color stops
  const step = 1 / (colors.length - 1);
  colors.forEach((color, index) => {
    gradient.addColorStop(index * step, color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (grain > 0) {
    applyGrain(ctx, canvas.width, canvas.height, grain);
  }
}
