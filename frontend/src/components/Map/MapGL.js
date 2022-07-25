import * as React from 'react';
import { useState, useMemo } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
// import { getImages } from '../../store/images';
// import { useDispatch, useSelector } from 'react-redux';
import Pin from './Pin'
import { GeolocateControl } from 'react-map-gl';
import './Map.css'

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGpyZWluaGFyZHQiLCJhIjoiY2w1dHU0MHZpMGowejNicDd2dTR2bnB6biJ9.4wFUQAyVbEJF2SnF2a1ILw'; // Set your mapbox token here


export default function MapGL() {
  // const dispatch = useDispatch();
  const mapRef = React.useRef()

  const [popupInfo, setPopupInfo] = useState(null);
  const [year, setYear] = useState(2015);
  const [featureCollection, setFeatureCollection] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const [value, setValue] = useState('');
  // const [viewState, setViewState] = useState({
  //   latitude: 40,
  //   longitude: -100,
  //   zoom: 3
  // })
  const sendNews = () => {
    setPopupInfo([
      ...pins,
      {
        id: `${newLocation.lat + Math.random()}`,
        lat: newLocation.lat,
        long: newLocation.long,
        text: value,
      },
    ]);
    setValue('');
    setNewLocation(null);
  };
  // console.log(newLocation.lat, newLocation.lng)

  const testImages = [{
    userId: 1,
    imageTitle: "Yooooo",
    imageUrl: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/28/12/pyramid-crop1.jpg?quality=75&width=982&height=726&auto=webp",
    imageDescription: "Aliens built it for sure",
    lng: 31.1342,
    lat: 29.9792
  }]

  const pins = useMemo(
    () =>
      testImages.map((image, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={image.lng}
          latitude={image.lat}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            console.log('image ------', image)
            console.log('popupInfo', popupInfo)
            setPopupInfo({ ...image })
          }}
        >
          <Pin />
        </Marker>
      )),
    [popupInfo, testImages]
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


  // const onHover = useCallback(event => {
  // const {
  //   // features,
  //   // point: { x, y }
  //   lat,
  //   lng
  // } = event;
  // const hoveredFeature = features && features[0];

  // prettier-ignore
  // setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  // }, []);


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



      // interactiveLayerIds={['images']}
      // onMouseMove={onHover}
      >

        <GeolocateControl
          // style={geolocateControlStyle}
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

        {/* <Source type="geojson" data={imageGeoJSON}>
          <Layer {...mapStyle} />
        </Source> */}

      </Map>
    </>
  );
}
