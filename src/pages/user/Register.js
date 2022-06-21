import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { register } from '../../store/user/userSlice';
import '../css/Style.css'
const Register = () => {

    const dispatch = useDispatch();
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        password_confirmation:'',
        terms:false
    })
    const handleRegister = (e) =>{
        e.preventDefault();
        dispatch(register(newUser));
        const regex =/[0-9]/;
        if(newUser.password !== newUser.password_confirmation){
            setError("Please, confirm your password correctly!" );
            return;
        }
        if(newUser.password.length <8){
            setError("Sorry, your password must contain 8 characters!");
            return;
        }
        if(!regex.test(newUser.password)){
            setError("Sorry, your password must contain 8 characters!")
            return;
        }
        if(newUser.password.length > 255){
        setError("Too many characters!")
        return;
        }
        if(!newUser.terms){
            setError("You must accept terms if you want to proceed!")
            return;
        }
    navigate('/galleries');
    }

  return (
    <section>
        <div className='imgBox'>
        <img
        alt='img'
        src={require('../../images/img2.jpg')}
        />
        </div>
        <div className='content-box'>
        <div className='form-box'>
        <h2>Register Here</h2>
        <h3 style={{ "color":"red" }}>{error}</h3>
        <form onSubmit={handleRegister}>
            <div className='input-box'>
                <label>First Name</label>
            <input
            required
            type='text'
            value={newUser.firstName}
            onChange={({target})=>setNewUser({...newUser, firstName:target.value})}
            placeholde='Enter Your First Name Here...'
            />
            </div>
            <div className='input-box'>
                <label>Last Name</label>
            <input
            required
            type='text'
            value={newUser.lastName}
            onChange={({target})=>setNewUser({...newUser, lastName:target.value})}
            placeholde='Enter Your Last Name Here...'
            />
            </div>
            <div className='input-box'>
                <label>Email:</label>
            <input
            required
            type='email'
            value={newUser.email}
            onChange={({target})=>setNewUser({...newUser, email:target.value})}
            placeholde='Enter Your Email Here...'
            />
            </div>
            <div className='input-box'>
                <label>Password</label>
            <input
            required
            type='password'
            value={newUser.password}
            onChange={({target})=>setNewUser({...newUser, password:target.value})}
            placeholde='Enter Your Password Here...'
            />
            </div>
            <div className='input-box'>
                <label>Confirm Password</label>
            <input
            required
            type='password'
            value={newUser.password_confirmation}
            onChange={({target})=>setNewUser({...newUser, password_confirmation:target.value})}
            placeholde='Confirm Your Password Here...'
            />
            </div>
            
            <div className='remember'>
                <label>
                    <input
                    type='checkbox'
                    required
                    value={newUser.terms}
                    onChange={({target})=>setNewUser({...newUser, terms:target.checked})}
                    />
                    Terms And Conditions
                </label>
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

export default Register