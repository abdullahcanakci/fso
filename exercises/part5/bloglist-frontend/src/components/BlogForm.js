import React from 'react'

const BlogForm= ({ onSubmit, blog, setBlog }) => {
  return (
    <form onSubmit={onSubmit}>
      <h3>create new</h3>
      <div>
        title:
        <input
          type="text"
          value={blog.title}
          name="title"
          onChange={({ target }) => setBlog({ ...blog, title: target.value })}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={blog.author}
          name="author"
          onChange={({ target }) => setBlog({ ...blog, author: target.value })}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={blog.url}
          name="url"
          onChange={({ target }) => setBlog({ ...blog, url: target.value })}
        />
      </div>
      <button>create</button>
    </form>
  )
}


export default BlogForm