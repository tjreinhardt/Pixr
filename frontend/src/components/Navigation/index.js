import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import AddImage from "../AddImage"
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
        <LoginFormModal />
        <NavLink className="nav-buttons" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='nav-wrapper'>
      <ul>
        <li>
          <NavLink className="nav-buttons" to="/images">Browse</NavLink>
          <NavLink className="nav-buttons" exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
      <AddImage />
    </div>

  );
}

export default Navigation;
