import * as React from 'react';
import { useState, useMemo } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
// import { getImages } from '../../store/images';
// import { useDispatch, useSelector } from 'react-redux';
import Pin from './Pin'
import './Map.css'

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGpyZWluaGFyZHQiLCJhIjoiY2w1dHU0MHZpMGowejNicDd2dTR2bnB6biJ9.4wFUQAyVbEJF2SnF2a1ILw'; // Set your mapbox token here


export default function MapGL() {
  // const dispatch = useDispatch();
  const mapRef = React.useRef()

  const [popupInfo, setPopupInfo] = useState(null);
  const [year, setYear] = useState(2015);
  const [featureCollection, setFeatureCollection] = useState(null);
  // const [viewState, setViewState] = useState({
  //   latitude: 40,
  //   longitude: -100,
  //   zoom: 3
  // })

  const testImages = [{
    userId: 1,
    imageTitle: "I told them I was lost",
    imageUrl: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/28/12/pyramid-crop1.jpg?quality=75&width=982&height=726&auto=webp",
    imageDescription: "But we all know I'm not supposed to be up here",
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
