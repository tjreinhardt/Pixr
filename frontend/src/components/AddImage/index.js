import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createImage } from '../../store/images';

import './AddImage.css';


const AddImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.session.user?.id);
  const [imageTitle, setImageTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const updateImageTitle = (e) => setImageTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateImageDescription = (e) => setImageDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageTitle('');
    setImageUrl('')
    setImageDescription('')


    const payload = {
      userId,
      imageTitle,
      imageUrl,
      imageDescription
    };

    try {
      const addedImage = await dispatch(createImage(payload));
      if (addedImage) {
        history.push(`/images/${addedImage.image.id}`)
      }
    } catch (err) {
      const errorRes = await err.json();
      const errorArray = errorRes.errors.filter(error => error !== "Invalid Entry")
      setErrors(errorArray)
    }
  };


  return (
    <>
      {userId && (
        <form onSubmit={handleSubmit} className='add-image-form'>
          <h3> Add a new Image </h3>
          {errors.map((err) => (
            <div key={err}>{err}</div>
          ))}
          <input
            type="text"
            placeholder='Title'
            value={imageTitle}
            onChange={updateImageTitle} />
          <input
            type="text"
            placeholder="Url"
            value={imageUrl}
            onChange={updateImageUrl} />
          <input
            type="text"
            placeholder="Description"
            value={imageDescription}
            onChange={updateImageDescription} />
          <button type="submit">Add new Image</button>
        </form>
      )}
    </>
  );
}

export default AddImage;
