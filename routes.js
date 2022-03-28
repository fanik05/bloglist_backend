const blogsRouter = require('express').Router()
const {
  getBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
  updateBlogById,
} = require('./controllers/blogs')

blogsRouter.get('/', getBlogs)
blogsRouter.get('/:id', getBlogById)
blogsRouter.post('/', createBlog)
blogsRouter.delete('/:id', deleteBlogById)
blogsRouter.patch('/:id', updateBlogById)

module.exports = blogsRouter
