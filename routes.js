const blogsRouter = require('express').Router()
const { getBlogs, createBlog } = require('./controllers/blogs')

blogsRouter.get('/', getBlogs)
blogsRouter.post('/', createBlog)

module.exports = blogsRouter
