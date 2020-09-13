module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'p5js',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  globals: {
    p5: 'readonly',
  },
  ignorePatterns: ['p5.js', 'p5.sound.min.js', 'p5.dom.min.js'],
  rules: {
    eqeqeq: 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'prefer-destructuring': 'off',
    'class-methods-use-this': 'off',
    allowElseIf: 'off',
    'no-else-return': 'off',
    'consistent-return': 'off',
    'spaced-comment': [2, 'always'],
    'no-console': 'off',
    'no-alert': 'error',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
    'no-useless-escape': 'warn',
    'no-restricted-properties': 'warn',
    'no-restricted-globals': 'off',
    'no-param-reassign': ['error', {
      props: false,
    }],
    'space-before-blocks': 'error',
    'no-return-assign': ['error', 'except-parens'],
    radix: ['error', 'as-needed'],
    'no-case-declarations': 'off',
    'no-extend-native': 'warn',
    'quote-props': ['error', 'as-needed'],
    'no-shadow': 'off',
    'guard-for-in': 'off',
    'new-cap': ['error', {
      newIsCapExceptions: ['p5'],
    }],
    'func-names': 'off',
    'no-use-before-define': 'off',
    'no-throw-literal': 'warn',
    'max-len': ['warn', { code: 150 }],
    'no-loop-func': 'off',
    'no-var': 'error',
    indent: [
      'error', 2, {
        CallExpression: {
          arguments: 2,
        },
        FunctionDeclaration: {
          body: 1,
          parameters: 2,
        },
        FunctionExpression: {
          body: 1,
          parameters: 2,
        },
        MemberExpression: 2,
        ObjectExpression: 1,
        SwitchCase: 1,
        ignoredNodes: [
          'ConditionalExpression',
        ],
      },
    ],
  },
};
