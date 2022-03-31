const supertest = require('supertest')
const mongoose = require('mongoose')
const { initialUsers, usersInDb } = require('./test_helper')
const app = require('../app')
const User = require('../models/User')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

describe('During invalid add user operation', () => {
  test('invalid users are not added', async () => {
    const usersAtStart = await usersInDb()

    const invalidUser = {
      username: 'te',
      name: 'test',
      password: 'test',
    }

    await api.post('/api/users').send(invalidUser)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('returns 400 status and error message', async () => {
    const invalidUser = {
      username: 'te',
      name: 'test',
      password: 'test',
    }

    const response = await api.post('/api/users').send(invalidUser)
    expect(response.status).toEqual(400)
    expect(response.body.error).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
