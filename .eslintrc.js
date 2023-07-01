module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'unused-imports',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:import/typescript',
    // 'plugin:import/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // 'prettier/prettier': [
    //     'error',
    //     {
    //         endOfLine: 'auto',
    //     },
    // ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
    // 'import/first': 'error',
    // 'import/newline-after-import': 'error',
    // 'import/no-duplicates': 'error',
    // 'import/order': [
    //     'error',
    //     {
    //         groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
    //         pathGroups: [
    //             {
    //                 pattern: 'angular',
    //                 group: 'external',
    //                 position: 'before',
    //             },
    //         ],
    //         alphabetize: {
    //             order: 'asc',
    //             caseInsensitive: true,
    //         },
    //         'newlines-between': 'always',
    //     },
    // ],
  },
};
