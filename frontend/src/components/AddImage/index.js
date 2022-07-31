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
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [status, setStatus] = useState(null);

  const updateImageTitle = (e) => setImageTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateImageDescription = (e) => setImageDescription(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateLat = (e) => setLat(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!lng) window.alert('Image will not be uploaded to the map!')
    // setImageTitle('');
    // setImageUrl('')
    // setImageDescription('')
    // setLng('');
    // setLat('');


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
        setStatus('Current Location Added');
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
    if (!lat) errors.push('Please assign your image a location!')
    setErrors(errors)
  }, [imageTitle, imageUrl, imageDescription, lat])

  return (
    <>
      <div className='form-container'>
        <div className="get-location-container">
          If you would like to add your image to the map, hit the button below before uploading!
          <br />
          <br />
          <button style={{ fontSize: '12px' }} className='nav-buttons' onClick={getLocation}>Get Location</button>
          <p style={{ color: 'green' }}>{status}</p>
          {/* {lat && <p>Latitude: {lat}</p>} */}
          {/* {lng && <p>Longitude: {lng}</p>} */}
        </div>
        {userId && (
          <form onSubmit={handleSubmit} className='add-image-form'>
            <h4 style={{ width: '400px' }}> Add Image To Map</h4>
            {errors.map((err) => (
              <li style={{ backgroundColor: "red" }} key={err}>{err}</li>
            ))}
            <br />
            <br />
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
              placeholder="Longitude"
              value={lng}
              onChange={updateLng}
              required
            />
            <input
              type="hidden"
              placeholder="Latitude"
              value={lat}
              onChange={updateLat}
            // required
            />

            {/* {lat && (
              <h3 style={{ color: 'green' }}>Image will be added to the map upon uploading!</h3>
            )}
            {!lat && (
              <h3 style={{ color: 'red' }}>Not uploading to map</h3>
            )} */}
            <div>
              <br />
              {!lat && <p style={{ color: "red" }}>Image cannot be added to map until you assign coordinates!</p>}
              {lat && imageTitle && imageUrl && imageDescription && < p style={{ color: "green" }}>Image is ready to add to the map!</p>}
              <button className="nav-buttons" type="submit" style={{ marginTop: '15%', fontSize: '16px' }}>Add new Image</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default AddImage;
