import { useState, useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import AuthContext from '../Store/Auth-Context';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ctx= useContext(AuthContext)
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    let url;
    if (isLogin) {
       url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpYKqaZ8q0kUsMkTnA0DoiizgmwfsW6rg`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpYKqaZ8q0kUsMkTnA0DoiizgmwfsW6rg`;
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = 'Authentication failed!';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      console.log('this is data recieved from server ',data);
       ctx.Loggedin(data.idToken)
      
      console.log(ctx) 
      history.replace('/profile');
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordInputRef} required />
        </div>
        {error && <p >{error}</p>}
        <div className={classes.actions}>
          {!isLoading && <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p style = {{color:'white'}}>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
