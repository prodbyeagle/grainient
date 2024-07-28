const path = require("path");

module.exports = {
  entry: "./src/index.ts", // Der Einstiegspunkt deiner Library
  output: {
    filename: "grainient.js", // Name der gebauten Datei
    path: path.resolve(__dirname, "dist"),
    clean: true, // Entfernt alte Builds
    // Wir benötigen hier keine `library`-Option für ES-Module
    // module: 'es6' ist hier nicht notwendig, weil wir `output.module: true` verwenden
    // libraryTarget: 'module' funktioniert nur für UMD-Module.
    // Es wird nicht für ES-Modul-Konfigurationen benötigt.
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
  mode: "development", // Ändere auf 'production' für Produktion
  experiments: {
    outputModule: true, // Erlaubt ES-Module im Output
  },
};
