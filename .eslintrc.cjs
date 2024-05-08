module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh',
    '@typescript-eslint',
    'import',
    'prettier',
  ],
  rules: {
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-debugger': 'off',
    'no-unused-vars': 'warn',
    'no-param-reassign': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'max-lines-per-function': ['error', { max: 100, skipBlankLines: true }],
    'class-methods-use-this': 'off',
    'react/require-default-props': 'off',
    'prettier/prettier': 'error',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'react/function-component-definition': 'off',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    curly: ['error', 'all'],
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
        allowedNames: ['context'],
      },
    ],
  },
};
