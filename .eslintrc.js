module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      },
    ],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: {
            message: 'Avoid using the `Object` type. Did you mean `object`?',
          },
          Boolean: {
            message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
          },
          Number: {
            message: 'Avoid using the `Number` type. Did you mean `number`?',
          },
          String: {
            message: 'Avoid using the `String` type. Did you mean `string`?',
          },
          Symbol: {
            message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
          },
          Function: false,
        },
      },
    ],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'off',
      {
        accessibility: 'explicit',
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'off',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: ['static-field', 'instance-field', 'static-method', 'instance-method'],
      },
    ],
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/quotes': [
      'off',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    '@typescript-eslint/semi': ['off', null],
    '@typescript-eslint/type-annotation-spacing': 'off',
    'arrow-parens': ['off', 'always'],
    'brace-style': ['off', 'off'],
    'eol-last': 'off',
    'import/no-deprecated': 'off',
    'import/no-internal-modules': [
      'off',
      {
        allow: ['@angular/*', 'aws-sdk/*', 'rxjs/*', 'zone.js/*'],
      },
    ],
    'import/order': 'off',
    'jsdoc/check-alignment': 'off',
    'jsdoc/newline-after-description': 'off',
    'jsdoc/no-types': 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
    'new-parens': 'off',
    'newline-per-chained-call': 'off',
    'no-console': ['error', { allow: ['log', 'warn', 'error', 'info'] }],
    'no-extra-semi': 'off',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'off',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-regex-spaces': 'error',
    'no-restricted-syntax': ['error', 'ForInStatement'],
    'no-trailing-spaces': 'off',
    'no-underscore-dangle': 'off',
    'prefer-arrow/prefer-arrow-functions': 'off',
    'quote-props': 'off',
    'react/jsx-curly-spacing': 'off',
    'react/jsx-equals-spacing': 'off',
    'react/jsx-tag-spacing': [
      'off',
      {
        afterOpening: 'allow',
        closingSlash: 'allow',
      },
    ],
    'react/jsx-wrap-multilines': 'off',
    'space-before-function-paren': 'off',
    'space-in-parens': ['off', 'never'],
  },
};
