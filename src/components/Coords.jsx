import { Button, Col, Container, Row } from "react-bootstrap";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";


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
            <Col>lat: {coords.latitude}</Col>
            <Col>long: {coords.longitude}</Col>
          </Row>
          <Row>
            <Map
              style={"mapbox://styles/mapbox/satellite-streets-v11"}
              containerStyle={{
                height: "50vh",
                width: "100vw",
              }}
              center={[coords.longitude, coords.latitude]}
              zoom={[10]}
            >
              <Layer
                type="symbol"
                id="marker"
                layout={{"icon-image":"symbols-marker"}}
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
