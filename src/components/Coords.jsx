import { Button, Container, Row } from "react-bootstrap";
import MapboxMap from "./MapboxMap";

const Coords = ({ coords, setCoords }) => {
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
            <MapboxMap coords={coords} zoom={12} height="50vh" width="100%" />
          </Row>
        </>
      )}
    </Container>
  );
};

export default Coords;
