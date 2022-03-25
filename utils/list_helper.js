const totalLikes = blogs => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

module.exports = {
  totalLikes,
}
