import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getImages } from '../../store/images';

import './ImageFeed.css'


const ImageFeed = () => {
  const dispatch = useDispatch();

  const images = useSelector(state => {
    return Object.values(state.images)
  });

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch])

  if (!images.length) {
    return null;
  }
  return (
    <main>
      <div className="image-container">
        {images.map((image) => {
          return (
            <NavLink key={image.id} to={`/images/${image.id}`}>
              <div
                className="browser-image"
                style={{ backgroundImage: `url('${image.imageUrl}')` }}
              ></div>
            </NavLink>
          );
        })}
      </ div>
    </main>
  );
};

export default ImageFeed;
