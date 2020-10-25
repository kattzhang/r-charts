const path = require('path');
const babel = require('rollup-plugin-babel');
const node = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const pkg = require('../package.json');

function resolve(p) {
  return path.resolve(__dirname, '..', p);
}

const builds = {
  'cjs': {
    entry: resolve('src/index.js'),
    dest: resolve('lib/index.common.js'),
    format: 'cjs',
  },
  'esm': {
    entry: resolve('src/index.js'),
    dest: resolve('lib/index.esm.js'),
    format: 'esm',
  },
}

function genConfig(type) {
  const opts = builds[type];
  const externalRE = /^(react|prop-types|lodash|echarts)/;

  return {
    input: opts.entry,
    external: id => externalRE.test(id),
    plugins: [
      node(),
      babel({ exclude: ['node_modules/**'] }),
      cjs(),
    ],
    output: {
      file: opts.dest,
      format: opts.format,
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }
}

exports.getAllBuilds = () => Object.keys(builds).map(genConfig);
