const path = require("path");
module.exports ={
  "mode":"development",
    entry: "./src/counterExample.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
      }
}
module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
