// import './LandingPage.css';
// import { useSelector } from 'react-redux';

// const LandingPage = ({ isLoaded }) => {

//   const sessionUser = useSelector(state => state.session.user);


//   return (
//     <div className="landing-page-container">
//       <div className="landing_page">
//         <div className='sweetr-welcome-div'>
//           <div className="welcome-to-sweetr">Welcome to Pixr! {isLoaded && !sessionUser && "Login or Signup to Continue"}</div>
//         </div>
//       </div>
//     </div>
//   )
// };

// export default LandingPage;



import { useSpringCarousel } from 'react-spring-carousel'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ImageCard from '../Images/ImageCard';
import { useEffect } from 'react';
export default function LandingPage() {
  const images = useSelector(state => { return Object.values(state.images) });
  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem
  } = useSpringCarousel({
    withLoop: true,
    items: images.map((i) => ({
      id: i.id,
      renderItem: (
        <NavLink className="image-cards" style={{ margin: '0px', maxWidth: "100%", maxHeight: "100%" }} key={i.id} to={`/images/${i.id}`}>
          <img style={{ margin: '0px', position: 'sticky', top: '0', minHeight: '100vh', minWidth: '100vw', width: '100%' }} className="image-card" src={i.imageUrl} />
        </NavLink>
      ),
    })),
  });
  useEffect(() => {
    const timer = setInterval(() => {
      slideToNextItem();
    }, 4000);
    return () => {
      window.clearInterval(timer);
    };
    // You MUST add the slide methods to the dependency list useEffect!
  }, [slideToNextItem]);

  return (
    <div>
      {carouselFragment}
      {/* <button onClick={slideToPrevItem}>Prev item</button>
      <button onClick={slideToNextItem}>Next item</button> */}
    </div>
  );
}
