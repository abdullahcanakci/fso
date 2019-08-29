import React from 'react'


const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h3>Login</h3>
      <div>
        username:
        <input
          type= "text"
          value={username}
          name= "username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type= "password"
          value={password}
          name= "passowrd"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div><button type="submit">Login</button></div>
    </form>
  )
}

export default LoginForm