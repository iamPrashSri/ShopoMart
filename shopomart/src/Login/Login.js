import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src="https://i.insider.com/539f3ffbecad044276726c01?width=1100&format=jpeg&auto=webp"
                    alt=""/>
            </Link>

            <div className="login__container">
                <h1>Sign In</h1>
                <form action="">
                    <h5>Email ID</h5>
                    <input type="text" />

                    <h5>Password</h5>
                    <input type="password" />

                    <button className="login__signInButton">Sign In</button>
                </form>

                <p>
                    By signing in you agree the Terms and Conditions of Amazon. 
                    Please see our privacy notice and out cookies policy.
                </p>

                <button className="login__registerButton">Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login;
