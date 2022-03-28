const blogsRouter = require('express').Router()
const {
  getBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
} = require('./controllers/blogs')

blogsRouter.get('/', getBlogs)
blogsRouter.get('/:id', getBlogById)
blogsRouter.post('/', createBlog)
blogsRouter.delete('/:id', deleteBlogById)

module.exports = blogsRouter
