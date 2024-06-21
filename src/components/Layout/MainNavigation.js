import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../Store/Auth-Context';
import classes from './MainNavigation.module.css';
import { useHistory } from 'react-router';

const MainNavigation = () => {

  const ctx = useContext(AuthContext)
  const history = useHistory()
  const islogin = ctx.isLoggedin

  const logoutHandler = () => {
    console.log('logout executed')
    ctx.Loggedout()
    history.replace('/auth');
  };
  

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!islogin &&  <li>
            <Link to='/auth'>Login</Link>
          </li> }
         {islogin &&   <li>
            <Link to='/profile'>Profile</Link>
          </li>}
         {islogin && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li> }
        
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
