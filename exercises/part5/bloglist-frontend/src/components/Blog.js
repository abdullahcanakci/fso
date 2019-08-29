import React, {useState} from 'react'
import './Blog.css'
const Blog = ({ blog, onUpvote, onDelete, deleteVisibility}) => {
  const [detail, setDetail] = useState(false)
  const displayState = {display: detail ? '' : 'none'}
  const dButVis = { display: deleteVisibility ? '' : 'none'}


  const handleUpvote = (event) => {
    event.preventDefault()
    onUpvote(blog)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    onDelete(blog)
  }

  return (
    <div className="blog_container">
      <div onClick={() => setDetail(!detail)} className="title">
        { blog.title } {blog.author}
      </div>
      <div style={displayState} className="detail">
        <p>url: {blog.url}</p>
        <p>{blog.likes} likes <button onClick={handleUpvote}>like</button></p>
        <p>added by {blog.user.username}</p>
        <button onClick={handleDelete} style={dButVis}>delete</button>
      </div>
    </div>
  
  )
}

export default Blog