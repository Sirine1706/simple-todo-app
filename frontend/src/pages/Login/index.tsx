import React from "react";

const Login = () => {
  return (
    <div className="login-form">
      <form>
        <label htmlFor="email">Email: </label>
        <br />
        <input type="email" name="email" id="email" placeholder="your email@gmail.com" />
        <br />
        <label htmlFor="password">Password: </label>
        <br />
        <input type="password" name="password" id="password" placeholder="enter your password" />
        <br />
        <button type="submit">Login</button>
        <p>
          If you have not an account? <a href="maka"> Sign in</a>
        </p>
      </form>
    </div>
  );
};
export default Login