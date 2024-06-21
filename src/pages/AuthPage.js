import AuthForm from '../components/Auth/AuthForm';
import AuthContext from '../components/Store/Auth-Context';
import { useContext } from 'react';

const AuthPage = () => {

  const ctx =useContext(AuthContext)
   
  const loggedIn = ctx.isLoggedin
  console.log("islogin",loggedIn,ctx)

  return (
  <>
  {!loggedIn  && <AuthForm />}
  </>

  )
  
};

export default AuthPage;
