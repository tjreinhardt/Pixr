import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { deleteImage, findImage } from '../../store/images';
import EditImageForm from '../EditImageForm';
import AddToCollectionButton from '../Collections/AddToCollection';
import { getCollection } from '../../store/collections';
import ProfileButton from '../Navigation/ProfileButton';
import { deleteCollection } from '../../store/collections';
// import * as sessionActions from '../../store/session';

import './SelectedImage.css';
import image from '../../store/images'

export const SelectedImage = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const images = useSelector(state => state.images)
  const sessionUser = useSelector(state => state.session.user)
  const collections = useSelector(state => image && state.collections[image.collectionId])
  const targetImage = images[imageId]

  // const [showEditButton, setShowEditButton] = useState(false);
  // const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);


  useEffect(() => {
    async function fetchImage() {
      console.log('sessionUser', sessionUser)
      dispatch(findImage(imageId));
    }
    fetchImage();
  }, [dispatch, imageId, history, sessionUser]);

  useEffect(() => {
    if (!images?.collectionId || collections) return;
    dispatch(getCollection(images.collectionId))
  }, [images, collections])

  if (!sessionUser) {
    return history.push('/signup')
  }
  const auth = sessionUser.id === targetImage.userId;

  console.log('sessionuser', sessionUser.id)
  console.log('images', targetImage.userId)


  const onDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteImage(targetImage));
    history.push("/images")
  }
  if (sessionUser) {
    <ProfileButton user={sessionUser} />
  }

  let content = null;
  if (auth) {
    content = (
      <>
        <EditImageForm image={targetImage} hideForm={() => setShowEditForm(false)} />
        {/* <button className="nav-buttons" onClick={() => setShowEditForm(!showEditForm)}>Edit Image</button> */}
        {/* <button className="nav-buttons" onClick={onDelete}>Delete Image</button> */}
      </>
    )
  }

  if (!targetImage) {
    return null;
  }

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
              <button className="nav-buttons" onClick={() => setShowEditForm(showEditForm)}>Edit Image</button>
              <br />
              <button className="nav-buttons" onClick={onDelete}>Delete Image</button>
            </>)}{content}
          {collections && <p>{collections?.title}</p>}
          <AddToCollectionButton imageId={imageId} />
        </div>
      </div>
    </div>
  )

}

export default SelectedImage;
