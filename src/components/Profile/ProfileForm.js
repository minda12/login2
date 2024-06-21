import classes from './ProfileForm.module.css';
import { useRef,useContext} from 'react';
import AuthContext from '../Store/Auth-Context';
import { useHistory } from 'react-router';

const ProfileForm = () => {


  const newpassInpRef = useRef()
  const ctx =useContext(AuthContext)
  const token = ctx.Token
  const history = useHistory()

  const  submitHandler = async (e)=>{

  e.preventDefault()
  try {
  const enteredpass = newpassInpRef.current.value 

  console.log(enteredpass)

  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDpYKqaZ8q0kUsMkTnA0DoiizgmwfsW6rg`,{
  
  method:'POST',
  body:JSON.stringify({
   idToken:token,
   password:enteredpass,
   returnSecureToken:true
   }),
  headers:{
   'Content-Type':'application/json'
  }

  })
  
  const data = await res.json();

  console.log(data)
  history.replace('/')
} catch (error) {

  console.log(error)
  
}
     

  }

  return (
    <form onSubmit = {submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input minLength='7' ref ={newpassInpRef} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button type = 'submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
