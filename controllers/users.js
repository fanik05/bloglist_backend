const bcrypt = require('bcrypt')
const User = require('../models/User')

const createUser = async (req, res) => {
  const { username, name, password } = req.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ error: 'username must be unique' })
  }

  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'password is missing or invalid' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, name, passwordHash })

  const savedUser = await user.save()

  res.json(savedUser)
}

const getUsers = async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
  res.json(users)
}

module.exports = { createUser, getUsers }
