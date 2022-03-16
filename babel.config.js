module.exports = {
  plugins: [
    '@babel/plugin-syntax-dynamic-import'
  ],
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        corejs: {
          proposals: false,
          version: 3,
        },
        targets: {
          browsers: 'last 2 versions and not dead',
        },
        useBuiltIns: 'entry',
      },
    ],
  ],
};
