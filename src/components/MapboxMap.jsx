import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";

const MapboxMap = ({ coords, zoom, height, width }) => {
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
  });

  return (
    <Map
      style={process.env.REACT_APP_MAPBOX_STYLE_URL}
      containerStyle={{
        height: height,
        width: width,
      }}
      center={[coords.longitude, coords.latitude]}
      zoom={[zoom]}
    >
      <ZoomControl />
      <Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "mapbox-marker-icon-blue" }}
      >
        <Feature coordinates={[coords.longitude, coords.latitude]} />
      </Layer>
    </Map>
  );
};

export default MapboxMap;
