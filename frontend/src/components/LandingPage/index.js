import './LandingPage.css';

const LandingPage = () => {
  return (
    <>
      <div className="landing_page" style={{ backgroundImage: `url('https://images6.alphacoders.com/902/902001.jpg')`, backgroundSize: 'cover', height: '100vmin', width: '100%', minHeight: '100vmax', minWidth: "100%", backgroundRepeat: 'none', maxWidth: "100vw", maxHeight: '100%' }}>
        <div className="welcome-to-sweetr">Welcome to Sweetr!</div>
        <div className="welcome-to-sweetr">Login or Signup to Continue!</div>
        <div className="login-signup-message"></div>
      </div>
    </>
  )
};

export default LandingPage;
