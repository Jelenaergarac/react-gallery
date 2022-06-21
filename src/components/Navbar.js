import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Link } from 'react-router-dom'

import {logout, selectActiveUser, selectIsAuthenticated} from '../store/user'
import '../pages/css/Navbar.css'
const Navbar = () => {
    const[click, setClick] = useState(false);
    const dispatch = useDispatch();
    const isAuthenticatedd = useSelector(selectIsAuthenticated);
    const activeUser = useSelector(selectActiveUser);

     
    
    const handleClick = () => {
        setClick(!click);
    }
 
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <>
               <nav className='navbar'>
            <div className='nav-container'>
          
            {isAuthenticatedd ? <h4 
            onClick={handleClick}
            className='nav-logo'>Hello, {activeUser && activeUser.firstName }!</h4>: <h4 className='nav-logo' onClick={handleClick}>Welcome Guest!</h4>}
            
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item '>
                <Link className='nav-links' 
                to="/galleries"
                onClick={handleClick}>Galleries</Link>
                </li>
                {isAuthenticatedd &&  <li className='nav-item'>
                <Link 
                onClick={handleClick}className='nav-links' 
                to="/my-galleries/:id">My Galleries</Link>
                </li>}
                
            {isAuthenticatedd ? (
        <>
                    <li className='nav-item'>
                    <Link 
                    onClick={handleClick}className='nav-links' 
                to="/create-galleries">Add New Gallery</Link>
                </li>
                <li> <button className='nav-btn' onClick={handleLogout}>Logout</button></li>
                </>
                ): (
                    <><li className='nav-item'>
                    <Link 
                    onClick={handleClick}
                    className='nav-links' to="/login">Login</Link>
                </li> 
                <li className='nav-item'>
                    <Link 
                    onClick={handleClick}
                    className='nav-links' to="/register">Register</Link>
                </li></>
            )}
            </ul>
             <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar