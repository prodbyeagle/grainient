const path = require("path");

module.exports = {
  entry: "./src/index.ts", // Dein Haupt TypeScript-Dateipfad
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "YourLibraryName", // Name deines exportierten Moduls
    libraryTarget: "umd", // Universal Module Definition für verschiedene Module
    globalObject: "this", // Benötigt, um Bibliotheken in Web und Node.js kompatibel zu machen
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
  devtool: "source-map", // Ermöglicht Source Maps für Debugging
};
