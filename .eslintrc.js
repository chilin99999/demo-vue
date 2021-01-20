module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'indent': [
      'error', 2, {
        'SwitchCase': 1,
      },
    ],
    'quotes': ['error', 'single'],
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'valid-jsdoc': [
      'error', {
        'requireReturn': false,
      },
    ],
    'require-jsdoc': [
      'error', {
        'require': {
          'FunctionDeclaration': true,
          'ArrowFunctionExpression': true,
          'MethodDefinition': false,
          'ClassDeclaration': false,
          'FunctionExpression': false,
        },
      },
    ],
    'semi': ['error', 'always'],
    'no-empty': 'error',
    'no-empty-function': 'error',
    'space-before-function-paren': ['error', 'never'],
    'space-before-blocks': ['error', {
      'functions': 'always',
      'keywords': 'always',
      'classes': 'always',
    }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
