const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "gradient.js",
    path: path.resolve(__dirname, "dist"),
    library: "Gradient", // Macht die Bibliothek global verfügbar
    libraryTarget: "umd", // Universal Module Definition
    globalObject: "this", // Vermeidet Probleme mit `window` in Node.js-Umgebungen
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
  devtool: 'source-map',
  mode: "development", // Ändere auf 'production' für die Produktion
};
