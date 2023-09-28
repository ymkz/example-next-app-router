/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'next/core-web-vitals',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  plugins: ['unused-imports'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' },
    ],
    'react/jsx-sort-props': ['error', { callbacksLast: true }],
    'unused-imports/no-unused-imports': 'error',
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
        pathGroups: [{ pattern: '~/**', group: 'external', position: 'after' }],
      },
    ],
  },
}
