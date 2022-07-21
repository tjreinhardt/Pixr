import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createImage } from '../../../store/images';
import { useEffect } from 'react';

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
    const addedImage = await dispatch(createImage(payload));
    if (addedImage) {
      history.push(`/images/${addedImage.image.id}`)
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

  return (
    <>
      <div className='form-container'>
        {userId && (
          <form onSubmit={handleSubmit} className='add-image-form'>
            <h4> Add Image </h4>
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
            <input
              type="text"
              placeholder='Title'
              value={imageTitle}
              onChange={updateImageTitle}
              required
            />
            <input
              type="text"
              placeholder="Url"
              value={imageUrl}
              onChange={updateImageUrl}
              required />
            <input
              type="text"
              placeholder="Description"
              value={imageDescription}
              onChange={updateImageDescription}
              required />
            <div>
              <br />
              <button className="nav-buttons" type="submit" style={{ marginTop: '15%', fontSize: '12px' }}>Add new Image</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default AddImage;
