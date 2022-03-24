const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/Blog')
const { MONGODB_URI, PORT } = require('./utils/config')
const { info, error } = require('./utils/logger')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware')

info('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => info('connected to MongoDB'))
  .catch(err => error('error connecting to MongoDB:', err.message))

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
