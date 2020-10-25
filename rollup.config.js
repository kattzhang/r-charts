const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')

export default {
  input: './src/index.js',
  output:[
    {
      format: 'esm',
      file: 'dist/r-echarts.esm.js'
    },
    {
      format: 'cjs',
      file: 'dist/r-echarts.common.js',
      exports: 'auto'
    },
  ],
  plugins: [
    resolve(),
    babel({ exclude: ['node_modules/**'] }),
  ],
  external: id => /^(react|prop-types|lodash|echarts)/.test(id),
}
