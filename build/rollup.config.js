const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const builds = require('./config').getAllBuilds()

fs.mkdirSync(path.resolve(__dirname, '../lib'))

build(builds)

function build (builds) {
  let index = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[index]).then(() => {
      index++
      if (index < total) {
        next()
      }
    }).catch(e => {
      console.log(e)
    })
  }

  next()
}

function buildEntry (config) {
  const output = config.output
  const { file } = output
  return rollup.rollup(config)
    .then(bundle => bundle.generate(output))
    .then(({ output: [{ code }] }) => {
      return write(file, code)
    })
}

function write (dest, code) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dest, code, err => {
      if (err) {
        return reject(err)
      } else {
        resolve()
      }
    })
  })
}
