if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
  require('dotenv').config()
}

const express = require('express')
const route = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', route)
app.use(errorHandler)

module.exports = app