import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCollections } from '../../store/collections'
import { modifyImage } from '../../store/images'




function AddToCollectionModal({ closeModal, imageId }) {

  const dispatch = useDispatch()

  const userId = useSelector((state) => state.session.user.id)

  const collections = useSelector((state) => {
    return Object.values(state.collections).filter((collection) => {
      return collection.userId === userId
    })
  })

  const image = useSelector(state => state.images[imageId])

  useEffect(() => {
    dispatch(getUserCollections(userId))
  }, [userId, dispatch])


  const addToCollection = (collectionId) => {
    const newImage = {
      userId,
      // title,
      collectionId,
      // description: image.imageDescription,
      // imageUrl: image.imageUrl
    }
    dispatch(modifyImage(newImage))
    closeModal();
  }
  return (
    <div onClick={closeModal}>
      <div className='add-to-collection-modal-bg' onClick={(e) => e.stopPropagation()}>
        {collections.map(collection => {
          return <button className='create-collection-styling' style={{ fontSize: "8px" }} onClick={() => addToCollection(collection.id)} key={collection.id}>{collection.title}</button>
        })}
      </div>

    </div>
  )
}


export default AddToCollectionModal;
