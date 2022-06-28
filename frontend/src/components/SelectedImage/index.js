import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { findImage } from '../../store/images';

import './SelectedImage.css';

export const SelectedImage = () => {
  const { imageId } = useParams();
  const images = useSelector(state => state.images)
  const targetImage = images[imageId]
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("----------------------", images[imageId])

  useEffect(() => {
    async function fetchImage() {
      try {
        dispatch(findImage(imageId));
      } catch (err) {
        console.log("Cannot find this image :(")
        history.push("/images")
      }
    }
    fetchImage();
  }, [dispatch, imageId, history]);

  return (
    <div className='selected-image-container'>
      <div className='selected-image-content'>
        <h2 className='selected-image-title'> {targetImage.imageTitle} </h2>
        <div>
          <img src={targetImage.imageUrl} alt="" />
        </div>
        <div>
          <p className="selected-image-description">{targetImage.imageDescription}</p>
        </div>
      </div>
    </div>
  )

}

export default SelectedImage;
