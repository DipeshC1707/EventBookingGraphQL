import React from 'react';
import './Auth.css';

const Auth = () => {
  return (
    <form className='auth-form'>
        <div className="form-control">
            <label for="email">Email</label>
            <input type="email" id="email"/>
        </div>
        <div className="form-control">
            <label for="password">Password</label>
            <input type="password" id="password"/>
        </div>
        <div className="form-control">
            <button type='button'>Switch to SignUp</button>
            <button type='button'>Login</button>
        </div>
    </form>
  )
}
export default Auth;