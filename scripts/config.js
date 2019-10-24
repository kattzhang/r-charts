const path = require('path');
const babel = require('rollup-plugin-babel');
const node = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const pkg = require('../package.json');
const version = pkg.version;

const banner =
  '/*!\n' +
  ` * r-charts v${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} Katt Zhang\n` +
  ' * Released under the MIT License.\n' +
  ' */'

function resolve(p) {
  return path.resolve(__dirname, '..', p);
}

const builds = {
  'web-runtime-esm': {
    entry: resolve('src/index.js'),
    dest: resolve('dist/r-charts.esm.js'),
    format: 'esm',
  },
  'web-runtime-cjs': {
    entry: resolve('src/index.js'),
    dest: resolve('dist/r-charts.common.js'),
    format: 'cjs',
  },
}

function genConfig(name) {
  const opts = builds[name];
  const externalRE = /^(react|prop-types|lodash|echarts)/
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
      banner: opts.banner,
      exports: 'named',
      name: opts.moduleName || 'r-charts',
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }
}

exports.getAllBuilds = () => Object.keys(builds).map(genConfig);
