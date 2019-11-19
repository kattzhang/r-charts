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
		'standard',
		'plugin:react/recommended'
  ],
	rules: {
		'semi': ['error', 'always'],
		'space-before-function-paren': ['error', 'never'],
		'comma-dangle': 0,
		'no-trailing-spaces': 0,
		'padded-blocks': 0,
	}
};
