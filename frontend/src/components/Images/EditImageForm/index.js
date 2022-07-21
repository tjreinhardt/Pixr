import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { deleteImage } from '../../../store/images';
import { useSelector, useDispatch } from 'react-redux';
import { modifyImage } from '../../../store/images';
import './EditImage.css';


const EditImageForm = ({ image, hideForm }) => {
  const id = image.id;
  const { imageId } = useParams();
  const userId = useSelector(state => state.session.user?.id);
  const dispatch = useDispatch();
  const history = useHistory();


  const [imageTitle, setImageTitle] = useState(image.imageTitle);
  const [imageUrl, setImageUrl] = useState(image.imageUrl);
  const [imageDescription, setImageDescription] = useState(image.imageDescription);

  const updateImageTitle = (e) => setImageTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateImageDescription = (e) => setImageDescription(e.target.value);
  const [errors, setErrors] = useState([]);
  const images = useSelector(state => state.images)
  const targetImage = images[imageId]

  const onSubmit = async (e) => {
    e.preventDefault();

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
    setErrors(errors)
  }, [imageTitle, imageUrl, imageDescription])

  const onDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteImage(targetImage));
    history.push("/images")
  }


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
