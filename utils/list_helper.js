const totalLikes = blogs => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  const blogLikes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...blogLikes)
  const { title, author, likes } = blogs.filter(
    blog => blog.likes === maxLikes
  )[0]

  return { title, author, likes }
}

const mostBlogs = blogs => {
  const authors = [...new Set(blogs.map(blog => blog.author))]
  const blogNo = []
  authors.forEach(author => {
    blogNo.push(blogs.filter(blog => blog.author === author).length)
  })
  const maxBlog = Math.max(...blogNo)

  return {
    author: authors[blogNo.indexOf(maxBlog)],
    blogs: maxBlog,
  }
}

const mostLikes = blogs => {
  const authors = [...new Set(blogs.map(blog => blog.author))]
  const bloglikes = []
  authors.forEach(author => {
    bloglikes.push(
      blogs
        .filter(blog => blog.author === author)
        .map(blog => blog.likes)
        .reduce((sum, likes) => sum + likes, 0)
    )
  })
  const maxLikes = Math.max(...bloglikes)

  return {
    author: authors[bloglikes.indexOf(maxLikes)],
    blogs: maxLikes,
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
