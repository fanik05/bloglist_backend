const blogsRouter = require('express').Router()
const { getBlogs, getBlogById, createBlog } = require('./controllers/blogs')

blogsRouter.get('/', getBlogs)
blogsRouter.get('/:id', getBlogById)
blogsRouter.post('/', createBlog)

module.exports = blogsRouter
