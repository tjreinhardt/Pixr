import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { findImage, deleteImage } from '../../store/images'
// import EditImageForm from '../EditImageForm';

import './SelectedImage.css';

export const SelectedImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { imageId } = useParams();
  const images = useSelector(state => state.images)
  const targetImage = images[imageId]
  console.log("----------------------", targetImage)

  useEffect(() => {
    async function fetchImages() {
      try {
        await dispatch(findImage(imageId));
      } catch (err) {
        console.log("Cannot find this image :(")
        history.push("/images")
      }
    }
    fetchImages();
  }, [dispatch, imageId, useHistory]);

  return (
    <div className='selected-image-container'>
      <div className='selected-image-content'>
        <h2> {targetImage.imageTitle} </h2>
        <div>
          <img src={targetImage.imageUrl} />
        </div>
        <div>
          <p>{targetImage.imageDescription}</p>
        </div>
      </div>
    </div>
  )

}

export default SelectedImage;
