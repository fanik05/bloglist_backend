const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const { MONGODB_URI } = require('./utils/config')
const { info, error } = require('./utils/logger')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
} = require('./utils/middleware')
const { blogsRouter, userRouter, loginRouter } = require('./routes')

info('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => info('connected to MongoDB'))
  .catch(err => error('error connecting to MongoDB:', err.message))

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
