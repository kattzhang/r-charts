// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: [
    'eslint-config-airbnb'
  ],
  rules: {
    'comma-dangle': 0,
    'no-trailing-spaces': 0,
    'no-restricted-syntax': 0,
    'operator-linebreak': 0,
    'class-methods-use-this': 0,
    'object-curly-newline': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': 0,
    'react/sort-comp': 0,
  }
};
