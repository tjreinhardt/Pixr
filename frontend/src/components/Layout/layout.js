import React from 'react'
import Navigation from '../Navigation'
import './layout.css'

function Layout({ children, isLoaded }) {
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className='body-layout-div'>
        <div className="layout-container-div">
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout;
