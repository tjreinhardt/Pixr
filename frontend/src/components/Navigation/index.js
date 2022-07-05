import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <NavLink className="nav-buttons" to="/signup">Signup</NavLink>
      </>
    );
  }

  return (
    <div className='nav-wrapper'>
      <ul>
        <li>
          <NavLink className="sweetr-logo-nav" exact to="/" style={{ fontSize: "36px", position: "absolute", left: "0", marginLeft: "10px", textDecoration: "none", color: "white", display: "flex", justifyContent: "flex-start" }}>Sweetr</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div >
  );
}

export default Navigation;
