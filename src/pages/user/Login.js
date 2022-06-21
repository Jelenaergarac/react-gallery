import React, { useState } from 'react'
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate} from 'react-router-dom'
import { login } from '../../store/user/userSlice';

const Login = () => {
  const[user, setUser] = useState({
    email:'',
    password:''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[error, setError] = useState('')
  const handleLogin = (e) =>{
dispatch(login(user));
navigate('/galleries');

  }
  return (
          <section>
        <div className='imgBox'>
        <img
        alt='img'
        src={require('../../images/img4.jpg')}
        />
        </div>
        <div className='content-box'>
        <div className='form-box'>
        <h2>Login Here</h2>
        <h3 style={{ "color":"red" }}>{error}</h3>
        <form onSubmit={handleLogin}>
            <div className='input-box'>
              <label>Email:</label>
            <input
            required
            type='email'
            value={user.email}
            onChange={({target})=>setUser({...user, email:target.value})}
            placeholde='Enter Your Email Here...'
            />
            </div>
            <div className='input-box'>
            <label>Password:</label>
            <input
            required
            type='password'
            value={user.password}
            onChange={({target})=>setUser({...user, password:target.value})}
            placeholde='Enter Your Password Here...'
            />
            </div>
           
        <div className='input-box'>
    <input type='submit' value='Submit' />
        </div>
        </form>
        </div>
        </div>
    </section>
  )
}

export default Login