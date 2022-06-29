import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { deleteImage, findImage } from '../../store/images';
import EditImageForm from '../EditImageForm';
import * as sessionActions from '../../store/session';

import './SelectedImage.css';

export const SelectedImage = () => {
  const { imageId } = useParams();
  const images = useSelector(state => state.images)
  const sessionUser = useSelector(state => state.session.user)
  const targetImage = images[imageId]
  const dispatch = useDispatch();
  const history = useHistory();

  const [showEditButton, setShowEditButton] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

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

  useEffect(() => {
    if (images && images.userId === sessionUser.id) {
      setShowEditButton(true);
    }
  }, [images, sessionUser.id])

  useEffect(() => {
    if (images && images.userId === sessionUser.id) {
      setShowDeleteButton(true);
    }
  }, [images, sessionUser.id])


  // const onEdit = (e) => {
  //   e.preventDefault();
  //   dispatch(modifyImage({ imageId, imageDescription }))
  //   setShowEditForm(!showEditForm)
  // }

  const onDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteImage(targetImage));
    history.push("/images")
  }

  let content = null;
  if (showEditForm) {
    content = (
      <EditImageForm image={targetImage} hideForm={() => setShowEditForm(false)} />
    )
  }

  if (!targetImage) {
    return null;
  }

  const auth = sessionUser?.imageId === images?.imageId;
  return (
    <div className='target-image-container'>
      <div className='target-image-content'>
        <h2 className='target-image-title'> {targetImage.imageTitle} </h2>
        <div>
          <img src={targetImage.imageUrl} alt="" />
        </div>
        <div>
          <p className="target-image-description">{targetImage.imageDescription}</p>
          {auth && (
            <>
              <button className="nav-buttons" onClick={() => setShowEditForm(!showEditForm)}>Edit Image</button>
            </>
          )}
          {auth && (
            <>
              <button className="nav-buttons" onClick={onDelete}>Delete Image</button>
            </>
          )}{content}
        </div>
      </div>
    </div>
  )

}

export default SelectedImage;
