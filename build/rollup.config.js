const path = require('path');
const fs = require('fs');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify').uglify;
const minify = require('uglify-es').minify;
const componentInfo = require('./componentList');
const pkgTypeList = require('./config');

const plugins = [
  resolve(),
  babel({
    exclude: 'node_modules/**',
  })
];
const inputOptions = {
  input: 'src/index.js',
  plugins: [
    resolve(),
    babel({
      // exclude: 'node_modules/**',
    })
  ],
};
const outputOptions = {
  file: 'lib/r-charts.js',
  name: 'r-charts',
  format: 'umd',
};

function build(config) {
  rollup.rollup(inputOptions)
    .then(bundle => bundle.generate(outputOptions))
    .then(({ output: [{ code }] }) => {
      console.log(code)
    });
};

build();
