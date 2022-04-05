const Blog = require('../models/Blog')
const User = require('../models/User')

const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
}

const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', {
    username: 1,
    name: 1,
  })
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
}

const createBlog = async (req, res) => {
  const { title, author, url, likes } = req.body
  const user = await User.findById(req.user.id)
  const blog = new Blog({ title, author, url, likes, user: user._id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
}

const deleteBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString() === req.user.id) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
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
