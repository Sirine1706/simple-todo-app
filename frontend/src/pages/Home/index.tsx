/** @format */

import {NavLink} from "react-router-dom";

const Home = () => {
  return (
    <div className='background'>
      <div className='container'>
        <h1>
          Our <span> TODO APP </span> brings all your tasks, teammates, and tools together
        </h1>
        <p>Keep everything in the same place—even if your team isn’t.</p>
        <div className='links'>
          <NavLink to='/sign-in'>Sign in</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </div>
      </div>
    </div>
  );
};
export default Home