module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: "off",
    "comma-dangle": "off",
    indent: "off",
    semi: "off",
    "space-before-function-paren": "off",
    "no-unused-vars": "off",
    "react/prop-types": "off",
    "no-use-before-define": "off",
    "spaced-comment": "off",
    "eol-last": "off"
  }
};
