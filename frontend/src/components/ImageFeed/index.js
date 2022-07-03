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
          <ImageCard imageURL={image.imageUrl} />
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
    <main>
      <div className="image-container">
        {memoImages}
      </ div>
    </main>
  );
};

export default ImageFeed;
