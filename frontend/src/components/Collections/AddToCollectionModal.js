import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCollections } from "../../store/collections";
import { modifyImage } from "../../store/images";
import { Link } from "react-router-dom";
import './AddToCollectionModal.css'


function AddToCollectionModal({ closeModal, imageId }) {
  // const { title, setTitle } = useState('')
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  // const image = useSelector(state => state.images[imageId])

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
      id: imageId,
      collectionId,
      userId,
      description: image.description,
    }
    dispatch(modifyImage(newImage))
    closeModal();
  }
  console.log(collections.id)
  return (
    <div className="background" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {collections.map(collection => {
          return (
            <div>
              <Link onClick={() => addToCollection(collection.id)} key={collection.id} to={`/collections/${collection.id}`} > {collection.title} </Link>
            </div>
          )
        })}
      </div>
    </div >
  )
}

export default AddToCollectionModal;
