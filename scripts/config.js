const path = require('path');
const babel = require('rollup-plugin-babel');
const node = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const pkg = require('../package.json');

function resolve(p) {
  return path.resolve(__dirname, '..', p);
}

const builds = {
  'r-charts': {
    entry: resolve('src/index.js'),
    dest: resolve('lib/r-charts.js'),
    format: 'umd',
  }
}

function genConfig(name) {
  const opts = builds[name];
  const externalRE = /^(react|react-dom|prop-types|lodash|echarts)/
  return {
    input: opts.entry,
    external: id => externalRE.test(id),
    plugins: [
      node(),
      babel({ exclude: ['node_modules/**'],}),
      cjs({ include: 'node_modules/**' },),
    ],
    output: {
      file: opts.dest,
      format: opts.format,
      name,
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }
}

exports.getAllBuilds = () => Object.keys(builds).map(genConfig);
