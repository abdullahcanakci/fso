import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs}) => {
  const blogViews = blogs.map(blog => <Blog key={blog.id} blog={blog}/>)
  return (
    <div>
      {blogViews}
    </div>
  )
}

export default BlogList