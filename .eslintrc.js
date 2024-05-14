module.exports = {
  extends: ['universe/native'],
  plugins: ['prettier', 'react', 'react-hooks', '@typescript-eslint'],
  rules: {
    // eqeqeq: 'error',
    'no-console': 'off',
    'prettier/prettier': 'error',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    // if you use React 17+; otherwise, turn this on
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'prefer-object-spread': 'warn',
    'import/prefer-default-export': ['warn', { target: 'single' }],
    'no-unused-vars': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
};
