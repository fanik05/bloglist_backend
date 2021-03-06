const { agent: supertest } = require('supertest')
const mongoose = require('mongoose')
const { initialBlogs, initialUsers, blogsInDb } = require('./test_helper')
const app = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
  await User.deleteMany({})
  await User.insertMany(initialUsers)
  const response = await api
    .post('/api/login')
    .send({ username: 'root-test', password: 'Abc123#' })
  api.auth(response.body.token, { type: 'bearer' })
})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Accept', 'application/json')
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(initialBlogs.length)
  })

  test('a blog has id property', async () => {
    const notesAtStart = await blogsInDb()
    const blogToMatch = notesAtStart[0]
    const response = await api.get(`/api/blogs/${blogToMatch.id}`)
    expect(response.body.id).toBeDefined()
  })

  describe('adding a new blog', () => {
    test('a blog is added', async () => {
      const blog = {
        title: 'test blog',
        author: 'test author',
        url: 'test url',
        likes: 100,
      }

      const response = await api.post('/api/blogs').send(blog)
      expect(response.status).toEqual(201)
      expect(response.headers['content-type']).toMatch(/json/)

      const blogsAtEnd = await blogsInDb()
      expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)
    })

    test('if likes is not defined, it defaults to 0', async () => {
      const blog = {
        title: 'test blog',
        author: 'test author',
        url: 'test url',
      }

      const response = await api.post('/api/blogs').send(blog)
      expect(response.body.likes).toEqual(0)
    })

    test('a blog has missing title or url', async () => {
      let blog = {
        author: 'test author',
        url: 'test url',
        likes: 100,
      }

      let response = await api.post('/api/blogs').send(blog)
      expect(response.status).toEqual(400)

      blog = {
        title: 'test blog',
        author: 'test author',
        likes: 100,
      }

      response = await api.post('/api/blogs').send(blog)
      expect(response.status).toEqual(400)
    })
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const blogUpdateData = {
      title: 'updated blog',
      author: 'updated author',
      url: 'https://updatedurl.com/',
      likes: 7,
    }
    await api.patch(`/api/blogs/${blogToUpdate.id}`).send(blogUpdateData)
    const blogsAtEnd = await blogsInDb()
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)
    expect(updatedBlog.title).toEqual(blogUpdateData.title)
  })
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})
