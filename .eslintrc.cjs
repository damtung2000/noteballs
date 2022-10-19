/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    quotes: ['warn', 'single'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
      },
    ],
    'no-unused-vars': ['warn', { vars: 'local' }],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
