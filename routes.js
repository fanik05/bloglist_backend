const blogsRouter = require('express').Router()
const userRouter = require('express').Router()
const loginRouter = require('express').Router()
const {
  getBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
  updateBlogById,
} = require('./controllers/blogs')
const { createUser, getUsers } = require('./controllers/users')
const login = require('./controllers/login')

blogsRouter.get('/', getBlogs)
blogsRouter.get('/:id', getBlogById)
blogsRouter.post('/', createBlog)
blogsRouter.delete('/:id', deleteBlogById)
blogsRouter.patch('/:id', updateBlogById)
userRouter.post('/', createUser)
userRouter.get('/', getUsers)
loginRouter.post('/', login)

module.exports = { blogsRouter, userRouter, loginRouter }
