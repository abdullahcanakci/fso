import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, onUpvote, onDelete, username }) => {
  const blogViews = blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      onUpvote={onUpvote}
      onDelete={onDelete}
      deleteVisibility={username === undefined ? false : blog.user.username === username}
    />
  )
  return (
    <div>
      {blogViews}
    </div>
  )
}

export default BlogList