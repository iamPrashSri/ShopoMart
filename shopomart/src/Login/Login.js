import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../Hosting/Firebase';
import './Login.css';

function Login() {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let history = useHistory(); /* To programmatically change the URL */
    const signIn = (event) => {
        event.preventDefault();     /* To not refresh page */

        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            if(auth){
                history.push('/');
            }
        }).catch((error) => {
            alert(error.message);
        });
    };

    const register = (event) => {
        event.preventDefault();

        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            // Successfully created user with email and password
            console.log(auth);
            if(auth){
                history.push('/');  /* Push to HomePage */
            }
        }).catch((error) => {
            alert(error.message);
        });
    };

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
                    <input 
                        value={email} 
                        type="text" 
                        onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password" />

                    <button type="submit" onClick={signIn} className="login__signInButton">
                        Sign In
                    </button>
                </form>

                <p>
                    By signing in you agree the Terms and Conditions of Amazon. 
                    Please see our privacy notice and out cookies policy.
                </p>

                <button onClick={register} className="login__registerButton">
                    Create your Amazon Account
                </button>
            </div>
        </div>
    )
}

export default Login;
