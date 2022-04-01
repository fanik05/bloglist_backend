const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: '624577070e4610fdb1594276',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    user: '624577070e4610fdb1594276',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    user: '624577070e4610fdb1594277',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    user: '624577070e4610fdb1594277',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    user: '624577070e4610fdb1594276',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    user: '624577070e4610fdb1594277',
    likes: 2,
    __v: 0,
  },
]

const initialUsers = [
  {
    _id: '624577070e4610fdb1594276',
    username: 'root-test',
    name: 'SuperTestuser',
    passwordHash:
      '$2b$10$Q/rutoDAcNI/PB1fRp5Jg.nzSSiikBzJvfiAS.9LRxQyjSAssegLC',
    blogs: [
      '5a422a851b54a676234d17f7',
      '5a422aa71b54a676234d17f8',
      '5a422ba71b54a676234d17fb',
    ],
  },
  {
    _id: '624577070e4610fdb1594277',
    username: 'admin-test',
    name: 'AdminTestuser',
    passwordHash:
      '$2b$10$Q/rutoDAcNI/PB1fRp5Jg.nzSSiikBzJvfiAS.9LRxQyjSAssegLC',
    blogs: [
      '5a422b3a1b54a676234d17f9',
      '5a422b891b54a676234d17fa',
      '5a422bc61b54a676234d17fc',
    ],
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'test',
    url: 'http://test.com',
    likes: 0,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
