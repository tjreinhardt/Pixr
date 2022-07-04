import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getImages } from '../../store/images';
import ImageCard from '../Images/ImageCard';

import './ImageFeed.css'

const ImageFeed = () => {
  const dispatch = useDispatch();

  const images = useSelector(state => { return Object.values(state.images) });

  const memoImages = React.useMemo(
    () => images.map((image) => {
      return (
        <NavLink key={image.id} to={`/images/${image.id}`}>
          <ImageCard className="image-card" imageURL={image.imageUrl} />
        </NavLink>
      );
    }),
    [images]
  )
  React.useEffect(() => {
    dispatch(getImages());
  }, [dispatch])

  if (!images.length) {
    return null;
  }


  return (
    <div className='image-feed-container-div'>
      <div className="image-container">
        {memoImages}
      </ div>
    </div>
  );
};

export default ImageFeed;
