const totalLikes = blogs => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return {}

  const likes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...likes)

  return blogs.filter(blog => blog.likes === maxLikes)[0]
}

module.exports = {
  totalLikes,
  favoriteBlog,
}
