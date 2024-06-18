import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';
const mainNavigation = (props) => {
  return (
   <header className='main-nav'>
    <div className='nav-logo'>
        <h1>EasyEvent</h1>
    </div>
    <nav className='nav-items'>
        <ul>
            <li><NavLink to={'/auth'} >Authenticate</NavLink></li>
            <li><NavLink to={'/events'}>Events</NavLink></li>
            <li><NavLink to={'/bookings'}>Bookings</NavLink></li>
        </ul>
    </nav>
   </header> 
  )
}
export default mainNavigation;