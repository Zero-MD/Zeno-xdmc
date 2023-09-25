let fs = require('fs') 
let chalk = require('chalk')
let moment = require('moment-timezone')

// Isi Produk Kamu
[] coming soon Masih tahap pengembangan

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'listproduk.js'"))
  delete require.cache[file]
  require(file)
})