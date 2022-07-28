import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './loginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemo = () => {
    const credential = 'demo@user.io'
    const password = 'password'
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => history.push('/images'))
  }

  return (
    <div>
      <form className="login-form-box" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email*
          <input
            type="text"
            value={credential}
            placeholder='Username or Email'
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password*
          <input
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="required-aster-text">Fields marked with * are required</div>
        <button style={{ fontSize: '10px', margin: '15px' }} className="nav-buttons" type="submit">Login</button>
      </form>
      <div className="demo-button-div">
        <button style={{ fontSize: '10px' }} className='nav-buttons' onClick={() => handleDemo()}>Demo Login</button>
      </div>
    </div>
  );
}

export default LoginForm;
