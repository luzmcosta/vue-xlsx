module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["plugin:vue/essential"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'unambiguous',
  },
  plugins: ['vue'],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
};
