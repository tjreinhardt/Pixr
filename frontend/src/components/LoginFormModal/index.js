import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './loginButton.css';
import Footer from '../Layout/Footer/Footer';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className="nav-buttons" onClick={() => setShowModal(true)}>Login</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />

        </Modal>
      )}
      <Footer />
    </>
  );
}

export default LoginFormModal;
