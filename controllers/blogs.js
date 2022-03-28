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
  const { title, author, url, likes } = req.body
  const blog = new Blog({ title, author, url, likes })
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
}

const deleteBlogById = async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
}

const updateBlogById = async (req, res) => {
  const note = req.body
  const updatedNote = await Blog.findByIdAndUpdate(req.params.id, note, {
    new: true,
  })
  res.json(updatedNote)
}

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
  updateBlogById,
}
