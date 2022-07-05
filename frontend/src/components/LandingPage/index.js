import './LandingPage.css';
import { useSelector } from 'react-redux';

const LandingPage = ({ isLoaded }) => {

  const sessionUser = useSelector(state => state.session.user);


  return (
    <div className="landing-page-container">
      <div className="landing_page">
        <div className='sweetr-welcome-div'>
          <div className="welcome-to-sweetr">Welcome to Sweetr! {isLoaded && !sessionUser && "Login or Signup to Continue"}</div>
        </div>
      </div>
    </div>
  )
};

export default LandingPage;
