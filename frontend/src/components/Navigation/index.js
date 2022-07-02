import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="nav-buttons" exact to="/">Home</NavLink>
        <LoginFormModal />
        <NavLink className="nav-buttons" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='nav-wrapper'>
      <ul>
        <li>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>

  );
}

export default Navigation;
