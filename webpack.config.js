const path = require("path");

module.exports = [
  {
    // CommonJS output
    entry: "./src/index.ts",
    target: "node",
    mode: "development",
    output: {
      path: path.resolve(__dirname, "dist/cjs"),
      filename: "index.js",
      libraryTarget: "commonjs2",
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    externals: {
      // Optional: if you want to exclude dependencies
    },
  },
  {
    // ESM output
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "dist/esm"),
      filename: "index.js",
      libraryTarget: "module",
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    experiments: {
      outputModule: true,
    },
  },
];
