const js = require('@eslint/js');
const globals = require('globals');
const jest = require('eslint-plugin-jest');
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
      jest,
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
];
