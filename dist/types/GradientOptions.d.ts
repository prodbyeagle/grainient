/**
 * Configuration options for a gradient.
 */
export type GradientOptions = {
    colors: string[];
    grain?: number;
    type?: "linear" | "radial";
    angle?: number;
};
