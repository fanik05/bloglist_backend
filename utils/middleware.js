const morgan = require('morgan')

const requestLogger = morgan('tiny')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ error: err.message })
  }

  next(err)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
