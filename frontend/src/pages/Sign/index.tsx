import React from 'react';

 const Sign = () => {
  return (
    <div className="login-form">
      <form style={{height: '45vh'}}>
        <label htmlFor="fullName">FullName: </label>
        <br />
        <input type="text" name="text" id="name" placeholder='your name' />
        <br />
        <label htmlFor="email">Email: </label>
        <br />
        <input type="email" name="email" id="email" placeholder="your email@gmail.com" />
        <br />
        <label htmlFor="password">
          Password: 
        </label>
        <br />
        <input type="password" name="password" id="password" placeholder='enter your password' />
        <br />
        <label htmlFor="password">
          Password Confirm: 
        </label>
        <br />
        <input type="password" name="password" id="password" placeholder='confirm your password' />
        <br />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};
export default Sign