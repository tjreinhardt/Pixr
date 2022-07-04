import React from 'react';
import './Footer.css';

function Footer() {

  return (
    <div className='footer-div'>
      <ul className="footer">
        <li className="footer-content">
          <p>Designed by Tim Reinhardt</p>
          <p id="design-tools-p">Built using React, Redux, PostgreSQL, Express.js, Node.js</p>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
