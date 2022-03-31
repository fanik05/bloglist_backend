const blogsRouter = require('express').Router()
const userRouter = require('express').Router()
const {
  getBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
  updateBlogById,
} = require('./controllers/blogs')
const { createUser, getUsers } = require('./controllers/users')

blogsRouter.get('/', getBlogs)
blogsRouter.get('/:id', getBlogById)
blogsRouter.post('/', createBlog)
blogsRouter.delete('/:id', deleteBlogById)
blogsRouter.patch('/:id', updateBlogById)
userRouter.post('/', createUser)
userRouter.get('/', getUsers)

module.exports = { blogsRouter, userRouter }
