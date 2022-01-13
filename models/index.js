const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const {
  DATABASE_URL: dbUrl,
  DATABASE_MAX_CONNECTIONS: maxString,
  DATABASE_MIN_CONNECTIONS: minString,
  DATABASE_IDLE: idleString,
  DATABASE_AQUIRE: acquireString,
  DATABASE_EVICT: evictString,
  DATABASE_SSL: sslEnabled,
  DATABASE_CA: ca,
  DATABASE_CERT: cert,
  DATABASE_KEY: key,
  GKE: gke
} = process.env

const min = parseInt(minString)
const max = parseInt(maxString)
const idle = parseInt(idleString)
const acquire = parseInt(acquireString)
const evict = parseInt(evictString) 
let ssl = {}

if (gke === 'true' && sslEnabled === 'true') {
  ssl = { ca, cert, key }
} else if (sslEnabled === 'true') {
  ssl = {
    ca: fs.readFileSync(path.join(__dirname,'../../', ca)),
    cert: fs.readFileSync(path.join(__dirname, '../../', cert)),
    key: fs.readFileSync(path.join(__dirname,'../../', key))
  }
}
const options = { pool: { max, min, idle, acquire, evict }, dialectOptions: {}}
if (sslEnabled === 'true') {
  options.dialectOptions.ssl = ssl
}
const sequelize = new Sequelize(dbUrl, options)

const db = {}

fs.readdirSync(__dirname)
   .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'sync.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize)
    const { name } = model
    db[name] = model
  })

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

module.exports = { ...db, sequelize, Sequelize }
