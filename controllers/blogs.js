const Blog = require('../models/Blog')

const getBlogs = async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
}

const getBlogById = async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
}

const createBlog = async (req, res) => {
  const blog = new Blog(req.body)

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
}

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
}
