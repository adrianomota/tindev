const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const dbCfg = require('./config/database')

const routes = require('./routes')

class App {
  constructor () {
    this.server = express()
    this.database()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.server.use(express.json())
    this.server.use(cors())
    this.server.use(morgan('dev'))
  }

  database () {
    mongoose.connect(dbCfg.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
      .then(() => console.log('connecting to database successful'))
      .catch(err => console.error('could not connect to mongo DB', err))
  }

  routes () {
    this.server.use(routes)
  }
}

module.exports = new App().server
