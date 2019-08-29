import React, {useEffect, useState} from 'react';
import BlogList from './components/BlogList'
import loginService from './services/login'
import blogService from './services/blogs'
import './App.css'
import { async } from 'q';



const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState({message: '', visible: false, isSuccess: false})
	const [blog, setBlog] = useState({ title: '', author:'', url:''})

	useEffect(() => {
		blogService
			.getAll()
			.then(blogs => setBlogs(blogs))
	}, [])

	useEffect(() =>{
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if(loggedUserJSON) {
			console.log('previous logged in user found')
			const user =JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const setMessageDisplay = (message, isSuccess) => {
		setMessage({message: message, visible: true, isSuccess: isSuccess})
		setTimeout(() => {setMessage({visible: false})}, 4000)
	}

	const onHandleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({username, password})

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

	const onHandleBlogCreation = async (event) => {
		event.preventDefault()
		const newBlogEntry = await blogService.create(blog)
		if(newBlogEntry){
			setBlogs(blogs.concat(newBlogEntry))
			setMessageDisplay(`a new blog ${newBlogEntry.title} by ${newBlogEntry.author}`, true)
		}
		console.log(blog)
	}

	const loginForm = () => {
		return (
			<form onSubmit={onHandleLogin}>
				<h3>Login</h3>
				<div>
					username: 
						<input 
							type= "text"
							value={username}
							name= "username" 
							onChange={({target}) => setUsername(target.value)}
						/>
				</div>
				<div>
					password:
						<input
							type= "password"
							value={password}
							name= "passowrd"
							onChange={({target}) => setPassword(target.value)}
						/>
				</div>
				<div><button type="submit">Login</button></div>
			</form>
		)
	}

	const blogFrom = () => {
		return (
			<form onSubmit={onHandleBlogCreation}>
				<h3>create new</h3>
				<div>
					title:
					<input
						type= "text"
						value={blog.title}
						name= "title"
						onChange={({target}) => setBlog({...blog, title:target.value})}
					/>
				</div>
				<div>
					author:
					<input 
						type= "text"
						value={blog.author}
						name= "author"
						onChange={({target}) => setBlog({...blog, author: target.value})}
					/>
				</div>
				<div>
					url:
					<input
						type = "text"
						value={blog.url}
						name= "url"
						onChange={({target}) => setBlog({...blog, url: target.value})}
					/>
				</div>
				<button>create</button>
			</form>
		)
	}

	const messageDisplay = () => {
		if(message.visible) {
			const type = message.isSuccess? 'success' : 'fail'
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
			<BlogList blogs={blogs} />
		</div>
	)
}

export default App
