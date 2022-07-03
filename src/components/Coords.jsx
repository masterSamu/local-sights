import { Button, Col, Container, Row } from "react-bootstrap";

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
        <Row>
          <Col>lat: {coords.latitude}</Col>
          <Col>long: {coords.longitude}</Col>
        </Row>
      )}
    </Container>
  );
};

export default Coords;
