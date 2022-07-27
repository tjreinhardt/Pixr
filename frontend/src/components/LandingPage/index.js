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


import React from 'react';
import { useSpringCarousel } from 'react-spring-carousel'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ImageCard from '../Images/ImageCard';
import { useEffect } from 'react';
import { getImages } from '../../store/images';
import { useDispatch } from 'react-redux';
export default function LandingPage() {
  const images = [
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://images6.alphacoders.com/737/737617.jpg",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://media.cntraveler.com/photos/628fd5ceeccad063f926fe99/master/w_3936,h_2624,c_limit/Plitvice-Lakes-Croatia-GettyImages-1080935866.jpg",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://i.pinimg.com/originals/ab/08/d7/ab08d7c8e8f8db33ed7011bf760fdd86.jpg",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://wallpaperaccess.com/full/1218016.jpg",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://photos.smugmug.com/Wallpapers/i-9f7H7SN/0/01c72b86/O/HDRshooter-4K-wallpaper-053-3840x2160.jpg",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://images.squarespace-cdn.com/content/v1/5a1ae11fc027d86156377907/1512168918329-SJIQ2JKOMWQAGILAGFIB/_ARN3000-2.jpg?format=2500w",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://i.pinimg.com/originals/df/15/54/df15545a3f2996db1054ff0457cb570a.jpg",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://cdn.wallpapersafari.com/25/3/xzGf3n.jpg",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://cdn.wallpapersafari.com/47/55/Sg5pZF.jpg",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://travelescapes.ie/wp-content/uploads/2021/01/SW-Las-Vagas-Neon-Sign.jpg",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://wallpaper.dog/large/20436178.jpg",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://i.pinimg.com/originals/b1/a4/d5/b1a4d592b5951af43867cd316aef89fd.jpg",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
    {
      userId: 1,
      imageTitle: "I told them I was lost",
      imageUrl: "https://free4kwallpapers.com/uploads/originals/2019/02/21/the-wonders-of-the-rainforest----wallpaper.jpg",
      imageDescription: "But we all know I'm not supposed to be up here",
      lat: 29.9792,
      lng: 31.1342
    },
  ]
  console.log(images, '------------images')
  const dispatch = useDispatch();
  const {
    carouselFragment,
    // slideToPrevItem,
    slideToNextItem
  } = useSpringCarousel({
    withLoop: true,
    items: images.map((i) => ({
      id: i.id,
      renderItem: (
        <div>

          <NavLink className="image-cards" style={{ margin: '0px', height: "100vw", maxWidth: "100vw", maxHeight: "100vh" }} key={i.id} to={`/images/${i.id}`}>
            <div>
              {i.title}
            </div>
            <div>

              <img style={{ opacity: "100%", margin: '0px', position: 'sticky', top: '0', minHeight: '100vh', minWidth: '100vw', width: '100vw', height: "100vh", bottom: '60px' }} className="image-card" src={i.imageUrl}>
              </img>
            </div>
          </NavLink>
        </div>
      ),
    })),
  });
  React.useEffect(() => {
    dispatch(getImages())
  }, [dispatch])
  useEffect(() => {
    const timer = setInterval(() => {
      slideToNextItem();
    }, 5000);
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
