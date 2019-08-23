const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(element => {
    sum += element.likes
  })
  return sum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 1) {
    return undefined
  }
  let fav = blogs[0]
  blogs.forEach(element => {
    if (element.likes > fav.likes) {
      fav = element
    }
  })
  return fav
}

const mostBlogs = (blogs) => {
  const dict = {}

  blogs.forEach(element => {
    if (dict[element.author] !== undefined) {
      dict[element.author] += 1
    } else {
      dict[element.author] = 1
    }
  })

  const response = {
    author: '',
    blogs: 0
  }

  for (const key in dict) {
    const value = dict[key]
    if (value > response.blogs) {
      response.author = key
      response.blogs = value
    }
  }

  return response
}

const mostLikes = (blogs) => {
  const dict = {}

  blogs.forEach(element => {
    if (dict[element.author] !== undefined) {
      dict[element.author] += element.likes
    } else {
      dict[element.author] = element.likes
    }
  })

  const response = {
    author: '',
    likes: 0
  }

  for (const key in dict) {
    const value = dict[key]
    if (value > response.likes) {
      response.author = key
      response.likes = value
    }
  }

  return response
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
