import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { findImage } from '../../store/images';
import EditImageForm from '../EditImageForm';
import { getCollection } from '../../store/collections';
import ProfileButton from '../Navigation/ProfileButton';

import './SelectedImage.css';
// import image from '../../store/images'
import AddToCollectionButton from '../Collections/AddToCollectionButton';

export const SelectedImage = () => {
  const { imageId } = useParams();
  const image = useSelector(state => state.images[imageId])
  const dispatch = useDispatch();
  const history = useHistory();
  const images = useSelector(state => state.images)
  const sessionUser = useSelector(state => state.session.user)
  const collections = useSelector(state => image && state.collections[image.collectionId])
  const targetImage = images[imageId]

  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    dispatch(findImage(Number(imageId)));
  }, [dispatch, imageId])

  useEffect(() => {
    if (!images?.collectionId || collections) return;
    dispatch(getCollection(images.collectionId))
  }, [images, collections, dispatch])

  if (!sessionUser) {
    return history.push('/signup')
  }
  const auth = sessionUser.id === images[imageId]?.userId;

  if (sessionUser) {
    <ProfileButton user={sessionUser} />
  }

  let content = null;
  if (auth) {
    content = (
      <>
        <EditImageForm image={targetImage} hideForm={() => setShowEditForm(!showEditForm)} />
      </>
    )
  }

  if (!targetImage) {
    return null;
  }

  return (
    <div className='target-image-container'>
      <div className='target-image-content'>
        <div className='target-image-title-div'>
          <h2 className='target-image-title'> {targetImage.imageTitle} </h2>
        </div>
        <div className='img-container'>
          <img src={targetImage.imageUrl} alt="" />
        </div>
        <div className='image-description-div'>
          <div className="target-image-description">{targetImage.imageDescription}</div>
        </div>
        <div>
        </div>
        <div>
          <AddToCollectionButton imageId={imageId} />
          {content}
          {collections && <p>{collections?.title}</p>}
        </div>
      </div>
    </div>
  )

}

export default SelectedImage;
