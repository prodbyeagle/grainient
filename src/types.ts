/**
 * @typedef {Object} GradientOptions
 * @property {string[]} colors - An array of color stops for the gradient.
 * Must contain between 2 and 6 colors.
 * @property {number} [grain=0] - The intensity of the grain effect.
 * A value between 1 and 50. Defaults to 0 (no grain).
 * @property {"linear" | "radial"} [type="linear"] - The type of gradient to create.
 * Can be either 'linear' or 'radial'. Defaults to 'linear'.
 * @property {number} [angle=45] - The angle of the gradient for linear gradients, in degrees.
 * Defaults to 45 degrees.
 */

/**
 * Defines the options for configuring a gradient.
 * @type {GradientOptions}
 */
export type GradientOptions = {
  colors: string[];
  grain?: number;
  type?: "linear" | "radial";
  angle?: number;
};
