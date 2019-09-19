const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const {
  DATABASE_URL: dbUrl,
  DATABASE_MAX_CONNECTIONS: max,
  DATABASE_MIN_CONNECTIONS: min,
  DATABASE_IDLE: idle,
  DATABASE_AQUIRE: acquire,
  DATABASE_EVICT: evict,
  DATABASE_SSL: ssl,
  DATABASE_LOGGING: logging,
  DATABASE_CA: ca,
  DATABASE_CERT: cert,
  DATABASE_KEY: key
} = process.env

let minTest = parseInt(min)
let maxTest = parseInt(max)
let idleTest = parseInt(idle)
let acquireTest = parseInt(acquire)
let evictTest = parseInt(evict) 

const sequelize = new Sequelize(dbUrl, {
  pool: { maxTest, minTest, idleTest, acquireTest, evictTest },
  dialectOptions: {
    ssl: (ssl === 'true') ? {
      ca: fs.readFileSync(path.join(__dirname,'../../', ca)),
      cert: fs.readFileSync(path.join(__dirname, '../../', cert)),
      key: fs.readFileSync(path.join(__dirname,'../../', key))
    } : false
  }
  logging: (logging === 'true')
})

const db = {}

fs.readdirSync(__dirname)
   .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'sync.js') // get all the model files
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    const { name } = model
    db[name] = model
  })

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

module.exports = {...db, sequelize, Sequelize }
