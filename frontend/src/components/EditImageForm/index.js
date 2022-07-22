import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { deleteImage } from '../../store/images';
import { useSelector, useDispatch } from 'react-redux';
import { modifyImage } from '../../store/images';
import './EditImage.css';
import { getUserCollections } from '../../store/collections';



const EditImageForm = ({ image, hideForm }) => {
  const id = image.id;
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.session.user?.id);
  const collection = useSelector(state => state.session.user)
  const collections = useSelector((state) => {
    return Object.values(state.collections).filter((collection) => {
      return collection.userId === userId
    })
  })

  const [collectionId, setCollectionId] = useState(image.collectionId)
  const [title, setTitle] = useState(collection.title)
  const [imageTitle, setImageTitle] = useState(image.imageTitle);
  const [imageUrl, setImageUrl] = useState(image.imageUrl);
  const [imageDescription, setImageDescription] = useState(image.imageDescription);
  const updateImageTitle = (e) => setImageTitle(e.target.value);
  const updateCollectionId = (e) => setCollectionId(Number(e.target.value));
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateImageDescription = (e) => setImageDescription(e.target.value);

  const [errors, setErrors] = useState([]);
  const images = useSelector(state => state.images)
  const targetImage = images[imageId]

  const onSubmit = async (e) => {
    e.preventDefault();
    history.push(`/collections/${collectionId}`)

    const payload = {
      id,
      userId,
      collectionId,
      imageTitle,
      imageUrl,
      imageDescription,
    }

    const dispatchImage = await dispatch(modifyImage(payload));
    if (dispatchImage) {
      hideForm();
    }
  };
  useEffect(() => {
    let errors = [];
    if (!imageTitle) errors.push("Please enter a title")
    if (!imageDescription) errors.push("Please enter a description")
    if (!imageUrl) errors.push("Please enter a URL")
    if (imageTitle.length > 40) errors.push("Title is too long")
    if (imageUrl.length > 250) errors.push("Url Length exceeds max limit")
    if (imageDescription.length > 250) errors.push("Description exceeds max length")
    if (!collectionId) errors.push("need an id TEST collections")
    setErrors(errors)
  }, [imageTitle, imageUrl, imageDescription, collectionId])


  const onDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteImage(targetImage));
    history.push("/images")
  }


  useEffect(() => {
    dispatch(getUserCollections(userId))
  }, [userId, dispatch])



  return (
    <>
      <div className='edit-image-form-container'>
        {userId && (
          <form onSubmit={onSubmit} className='update-image-form'>
            <div className='update-image-title-div'>
              <h4 className='update-image-title'> Update image </h4>
            </div>
            {errors.map((error, idx) => (
              <li className="update-form-li" key={idx}>{error}</li>
            ))}
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={imageTitle}
              onChange={updateImageTitle}
              required
            />
            <label htmlFor="url">Url</label>
            <input
              type="text"
              placeholder="Image URL"
              id="url"
              value={imageUrl}
              onChange={updateImageUrl}
              required
            />
            <label>Description</label>
            <input
              type="textarea"
              id="description"
              placeholder="Description"
              value={imageDescription}
              onChange={updateImageDescription}
              required
            />
            {/* <input
              type="number"
              id="collectionId"
              placeholder="CollectionId"
              value={collectionId}
              onChange={updateCollectionId}
            /> */}
            <label>Move to Collection</label>
            <select
              value={collectionId}
              onChange={updateCollectionId}
            >
              {collections.map(collection => {
                return <option key={collection.id} label={collection.title}>{collection.id}</option>
              })}
            </select>
            <br />
            <div className='edit-image-buttons-container'>
              <button className="nav-buttons" type="submit">Update</button>
              <button className="nav-buttons" onClick={onDelete}>Delete</button>
            </div>
          </form>)
        }
      </div>
    </>
  )
};

export default EditImageForm;
