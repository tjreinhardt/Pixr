import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
// import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  // const history = useHistory();
  // const dispatch = useDispatch();

  // const handleSubmit = () => {
  //   const credential = 'demo@user.io'
  //   const password = 'password'
  //   return dispatch(sessionActions.login({ credential, password }))
  //     .then(() => history.push('/images'))
  // }

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
    </div>

  );
}

export default Navigation;
