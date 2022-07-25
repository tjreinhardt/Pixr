import * as React from 'react';
import { useState, useMemo } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import Pin from './Pin'
import { GeolocateControl } from 'react-map-gl';
import './Map.css'
import { useSelector } from 'react-redux';
import { getImages } from '../../store/images';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGpyZWluaGFyZHQiLCJhIjoiY2w1dHU0MHZpMGowejNicDd2dTR2bnB6biJ9.4wFUQAyVbEJF2SnF2a1ILw'; // Set your mapbox token here


export default function MapGL() {
  const dispatch = useDispatch();
  const mapRef = React.useRef()
  const [popupInfo, setPopupInfo] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const images = useSelector(state => { return Object.values(state.images) });



  const pins = useMemo(
    () =>
      images.map((image, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={image.lng}
          latitude={image.lat}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo({ ...image })
          }}
        >
          <Pin />
        </Marker>
      )),
    [images]
  )


  const createFeatureCollection = (imagesArray) => {
    return {
      "type": "FeatureCollection",
      "features": imagesArray.map((dbImage) => {
        return {
          "type": "Feature",
          "properties": {
            "url": dbImage.imageUrl,
            "title": dbImage.imageTitle,
            "body": dbImage.imageDescription,
            "userId": dbImage.userId
          },
          "geometry": {
            "type": "Point",
            "coordinates": [dbImage.lng, dbImage.lat]
          }
        }
      })
    }
  }


  React.useEffect(() => {
    dispatch(getImages())
  }, [dispatch])

  React.useEffect(() => {
    createFeatureCollection(images)
  }, [images])


  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3
        }}
        style={{ position: "fixed", height: '100%', width: '100%' }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        projection="globe"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          onGeolocate={(position) => {
            // get latitude and longitude of user current location
            setNewLocation([position.coords.latitude, position.coords.longitude]);
          }}
        />
        {pins}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.lng)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div className="popup-info-container" style={{ position: 'relative', width: '200px' }}>
              {popupInfo.imageTitle}
              <br />
              {popupInfo.imageDescription}
              <br />
              <br />
              Longitude: {popupInfo.lng}
              <br />
              Latitude: {popupInfo.lat}
              <img width="100%" height="100%" src={popupInfo.imageUrl} alt="" />
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
}
