const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    assert: require.resolve("assert"),
    buffer: require.resolve("buffer"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    process: require.resolve("process/browser"),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    })
  );

  return config;
};
