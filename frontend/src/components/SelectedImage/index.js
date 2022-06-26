import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { findImage, deleteImage } from '../../store/images'
// import EditImageForm from '../EditImageForm';

import './SelectedImage.css';

export const SelectedImage = () => {
  const { imageId } = useParams();
  const images = useSelector(state => state.images)
  const dispatch = useDispatch();
  const history = useHistory();
  const targetImage = images[imageId]
  console.log("----------------------", targetImage)

  useEffect(() => {
    async function fetchImage() {
      try {
        await dispatch(findImage(imageId));
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
        <h2> {targetImage.imageTitle} </h2>
        <div>
          <img src={targetImage.imageUrl} alt="" />
        </div>
        <div>
          <p>{targetImage.imageDescription}</p>
        </div>
      </div>
    </div>
  )

}

export default SelectedImage;
