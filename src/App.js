import { Switch, Route ,Redirect } from 'react-router-dom';
import AuthContext from './components/Store/Auth-Context';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';


function App() {

  const ctx = useContext(AuthContext)
  const loggedIn = ctx.isLoggedin
  console.log('from app',ctx)
  return (
   

     
    <Layout>
      <Switch>
      {loggedIn && <Route path='/profile'>
          <UserProfile />
        </Route>}

        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='*'>
          <Redirect to ='/auth' />
        </Route>
   
      </Switch>
    </Layout>
  
  );
}

export default App;
