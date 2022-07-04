import React from 'react'
import Navigation from '../Navigation'
import './layout.css'
// import background from "../../ImageImports/background.jpg"

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
