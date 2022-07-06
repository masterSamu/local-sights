import { Button, Container, Row } from "react-bootstrap";
import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";

const Coords = ({ coords, setCoords }) => {
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  };

  return (
    <Container className="coords-container">
      <Row>
        <Button variant="primary" onClick={getLocation}>
          Get location
        </Button>
      </Row>
      {coords && (
        <>
          <Row>
            <Map
              style={"mapbox://styles/samu-mapbox/cl59hxi60000u15pjrocn109d"}
              containerStyle={{
                height: "50vh",
                width: "100vw",
              }}
              center={[coords.longitude, coords.latitude]}
              zoom={[12]}
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
          </Row>
        </>
      )}
    </Container>
  );
};

export default Coords;
