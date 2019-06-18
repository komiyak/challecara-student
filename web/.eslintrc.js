module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': 'standard',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018
  },
  'plugins': [
    'react',
    'babel'
  ],
  'parser': 'babel-eslint',
  'rules': {
    'no-unused-vars': 'off',
    'space-before-function-paren': ['error', 'never']
  }
}
