import React from 'react'

export const Login = () => {
  return (
    <div className="login-form">
      <form>
        <label htmlFor="email">Email: </label><br />
        <input type="email" name="email" id="email" /><br />
        <label htmlFor="password">Password: </label><br />
        <input type="password" name="password" id="password" /><br />
        <button type="submit">Login</button>
        <p>If you have not an account? <a href="maka"> Sign in</a></p>
      </form>
    </div>
  )
}
