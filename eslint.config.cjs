const js = require('@eslint/js');
const globals = require('globals');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  { ignores: ['node_modules/**', 'coverage/**'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      'no-bitwise': 'off',
      'no-lonely-if': 'off',
      'class-methods-use-this': 'off',
      'arrow-body-style': 'off',
      'no-loop-func': 'off',
    },
  },
  {
    // Existing Fibonacci test intentionally uses imprecise number literals.
    files: ['src/algorithms/math/fibonacci/__test__/fibonacciNth.test.js'],
    rules: { 'no-loss-of-precision': 'off' },
  },
];
