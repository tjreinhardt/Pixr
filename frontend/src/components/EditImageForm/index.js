import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modifyImage } from '../../store/images';
// import './EditImageForm.css';


const EditImageForm = ({ image, hideForm }) => {
  const id = image.id;
  const userId = useSelector(state => state.session.user?.id);
  const dispatch = useDispatch();

  const [imageTitle, setImageTitle] = useState(image.imageTitle);
  const [imageUrl, setImageUrl] = useState(image.imageUrl);
  const [imageDescription, setImageDescription] = useState(image.imageDescription);

  const updateImageTitle = (e) => setImageTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateImageDescription = (e) => setImageDescription(e.target.value);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id,
      userId,
      imageTitle,
      imageUrl,
      imageDescription,
    }


    try {
      const dispatchImage = await dispatch(modifyImage(payload));
      if (dispatchImage) {
        hideForm();
      }
    } catch (err) {
      const errorResponse = await err.json();
      const errorsArray = errorResponse.errors.filter(error => error !== "Invalid value")
      setErrors(errorsArray)
    }
  };



  return (
    <>
      {userId && (
        <form onSubmit={onSubmit} className='form'>
          <h4> Update image </h4>
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={imageTitle}
            onChange={updateImageTitle}
          />
          <label htmlFor="url">Url</label>
          <input
            type="text"
            placeholder="Image URL"
            id="url"
            value={imageUrl}
            onChange={updateImageUrl}
          />
          <label>Description</label>
          <input
            type="textarea"
            id="url"
            placeholder="description"
            value={imageDescription}
            onChange={updateImageDescription}
          />
          <br />
          <button type="submit">Update Image</button>
        </form>)
      }
    </>
  )
};

export default EditImageForm;
