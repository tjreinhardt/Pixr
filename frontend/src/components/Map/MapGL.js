import * as React from 'react';
import { useState, useMemo } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
// import { getImages } from '../../store/images';
// import { useDispatch, useSelector } from 'react-redux';
import Pin from './Pin'

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
    imageTitle: "Look at this pizookie I made",
    imageUrl: "https://sugarspunrun.com/wp-content/uploads/2021/11/Pizookie-recipe-1-of-1-2.jpg",
    imageDescription: "I love pizookies :O",
    lng: -117.99955,
    lat: 33.65863
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
        style={{ height: '900px', width: '900px' }}
        mapStyle="mapbox://styles/mapbox/light-v9"
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
            <div style={{ position: 'relative', width: '110px' }}>
              {/* {popupInfo.imageUrl} */}
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
