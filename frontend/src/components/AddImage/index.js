import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createImage } from '../../store/images';
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
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const updateImageTitle = (e) => setImageTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateImageDescription = (e) => setImageDescription(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateLat = (e) => setLat(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageTitle('');
    setImageUrl('')
    setImageDescription('')
    setLng('');
    setLat('')


    const payload = {
      userId,
      imageTitle,
      imageUrl,
      imageDescription,
      lng,
      lat
    };
    const addedImage = await dispatch(createImage(payload));
    if (addedImage) {
      history.push(`/images/${addedImage.image.id}`)
    }
  };
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus('Your current location:');
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }


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
        <div className="get-location-container">
          If you would like to add your image to the map with your current location, hit the button below before uploading!
          <br />
          <br />
          <button className='nav-buttons' onClick={getLocation}>Get Location</button>
          <p>{status}</p>
          {lat && <p>Latitude: {lat}</p>}
          {lng && <p>Longitude: {lng}</p>}
        </div>
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
            <input
              type="hidden"
              placeholder="longitude"
              value={lng}
              onChange={updateLng}
            />
            <input
              type="hidden"
              placeholder="lat"
              value={lat}
              onChange={updateLat}
            />
            {lat && (
              <h3>Adding to map!</h3>
            )}
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
