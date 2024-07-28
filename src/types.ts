/**
 * Configuration options for a gradient.
 */
export type GradientOptions = {
  /**
   * An array of color values to be used in the gradient.
   * Each color should be a valid CSS color string.
   */
  colors: string[];

  /**
   * The amount of noise or graininess to apply to the gradient.
   * This value is optional.
   * @default 0
   */
  grain?: number;

  /**
   * The type of gradient to apply.
   * Can be either 'linear' for a linear gradient or 'radial' for a radial gradient.
   * This value is optional.
   * @default 'linear'
   */
  type?: "linear" | "radial";

  /**
   * The angle of the gradient, applicable only for linear gradients.
   * This value is optional and should be a number representing the angle in degrees.
   * @default 0
   */
  angle?: number;
};
