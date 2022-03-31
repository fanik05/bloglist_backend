const bcrypt = require('bcrypt')
const User = require('../models/User')

const createUser = async (req, res) => {
  const { username, name, password } = req.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ error: 'username must be unique' })
  }

  if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
    return res.status(400).json({
      error:
        'password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter and one special character',
    })
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
