import React, { useEffect, useState } from 'react';
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import loginService from './services/login'
import blogService from './services/blogs'
import './App.css'



const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState({ message: '', visible: false, isSuccess: false })
	const [blog, setBlog] = useState({ title: '', author: '', url: '' })
	const blogFormRef = React.createRef()

	const sortBlogs = (unsortedBlogs) => {
		setBlogs(
				unsortedBlogs.sort((el1, el2) => {
				return el2.likes - el1.likes
			})
		)
	}

	useEffect(() => {
		 blogService
			.getAll()
			.then(blogs => sortBlogs(blogs))
		
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			console.log('previous logged in user found')
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])



	const setMessageDisplay = (message, isSuccess) => {
		setMessage({ message: message, visible: true, isSuccess: isSuccess })
		setTimeout(() => { setMessage({ visible: false }) }, 4000)
	}

	const onHandleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({ username, password })

			setUser(user)
			blogService.setToken(user.token)
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			setUsername('')
			setPassword('')
		} catch (exception) {
			setMessageDisplay('Wrong Credentials', false)
		}
	}

	const onHandleLogout = async (event) => {
		event.preventDefault()

		try {
			window.localStorage.removeItem('loggedUser')
			setUser(null)
			blogService.setToken(null)
		} catch (exception) {
			setMessage(exception, false)
		}
	}
	
	const onHandleUpvote = async (b) => {
		const newBlog = await blogService.upvote(b)
		//setBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog))
		sortBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog))
		
	}

	const onHandleDelete = async (deletedBlog) => {
		if(window.confirm(`Deleting blog ${deletedBlog.title} by ${deletedBlog.author}`)){
			blogService
				.deleteBlog(deletedBlog)
				.then(response => {
					if(response.status === 204) {
						sortBlogs(
							blogs.filter(blog => blog.id !== deletedBlog.id)
						)
					}
				})
		}

	}

	/**
	 * Handles creation of a blog entry, network request and local cache update based on response
	 * @param {event} click event produced
	 */
	const onHandleBlogCreation = async (event) => {
		event.preventDefault()
		blogFormRef.current.toggleVisibility()
		const newBlogEntry = await blogService.create(blog)
		if (newBlogEntry) {
			setBlogs(blogs.concat(newBlogEntry))
			setMessageDisplay(`a new blog ${newBlogEntry.title} by ${newBlogEntry.author}`, true)
		}
		console.log(blog)

	}

	const loginForm = () => {
		return (
			<Toggleable buttonLabel='login'>
				<LoginForm
					handleLogin={onHandleLogin}
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
				/>
			</Toggleable>
		)
	}

	const blogFrom = () => {
		return(
			<Toggleable buttonLabel="new note" ref={blogFormRef}>
				<BlogForm onSubmit={onHandleBlogCreation} blog={blog} setBlog={setBlog} />
			</Toggleable>
		)
	}

	/**
	 * This block will assign respective classes to the notification,
	 * based on message.isSuccess property
	 */
	const messageDisplay = () => {
		if (message.visible) {
			const type = message.isSuccess ? 'success' : 'fail'
			return (
				<p className={`notification ${type}`}>
					{message.message}
				</p>
			)
		}
	}

	return (
		<div>
			<div>
				{messageDisplay()}
			</div>
			<div>
				{
					user === null ?
						loginForm() :
						<div>
							<p>{user.username} logged in</p> <button onClick={onHandleLogout}>logout</button>
							{blogFrom()}
						</div>
				}
			</div>
			<BlogList blogs={blogs} onUpvote={onHandleUpvote} onDelete={onHandleDelete} username={user ? user.username : undefined}/>
		</div>
	)
}

export default App
