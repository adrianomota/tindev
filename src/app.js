const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dbCfg = require('./config/database')
const connectedUsers = {}

class App {
  constructor () {
    this.express = express()
    this.server = require('http').Server(this.express)
    this.database()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(morgan('dev'))
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
    const io = require('socket.io')(this.server)

    io.on('connection', socket => {
      const { user } = socket.handshake.query

      connectedUsers[user] = socket.id
    })
    this.express.use(require('./routes')(io, connectedUsers))
  }
}

module.exports = new App().server
