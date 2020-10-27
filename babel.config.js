module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "auto",
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
    "@babel/preset-react",
  ],
};
