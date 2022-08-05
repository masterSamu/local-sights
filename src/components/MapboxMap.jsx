import Map, { GeolocateControl, NavigationControl, Marker } from "react-map-gl";
import { useDispatch } from "react-redux";
import { createNotification } from "../reducers/notificationReducer";
const defaultCoords = { longitude: 23.78712, latitude: 61.49911 }; // Tampere coordinates

const MapboxMap = ({
  coords,
  zoom,
  height,
  width,
  setCoords,
  setZoom,
  getLocationEnabled,
}) => {
  const dispatch = useDispatch();

  const handleGeoLocate = (event) => {
    if (event.coords) {
      setCoords({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
      });
      setZoom(13);
    }
  };

  const handleGeoLocateError = (event) => {
    dispatch(
      createNotification({
        type: "error",
        message: `${event.message}. You must allow browser to know your location.`,
      })
    );
  };

  return (
    <Map
      initialViewState={{
        longitude: coords ? coords.longitude : defaultCoords.longitude,
        latitude: coords ? coords.latitude : defaultCoords.latitude,
        zoom,
      }}
      style={{ height, width }}
      mapStyle={process.env.REACT_APP_MAPBOX_STYLE_URL}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
    >
      {getLocationEnabled && (
        <GeolocateControl
          onGeolocate={handleGeoLocate}
          onError={handleGeoLocateError}
          showUserLocation={true}
          showAccuracyCircle={true}
        />
      )}

      <NavigationControl />
      {!getLocationEnabled && coords && (
        <Marker longitude={coords.longitude} latitude={coords.latitude} />
      )}
    </Map>
  );
};

export default MapboxMap;
