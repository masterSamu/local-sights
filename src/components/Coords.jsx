import { Button, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNotification } from "../reducers/notificationReducer";
import MapboxMap from "./MapboxMap";

const Coords = ({ coords, setCoords }) => {
  const dispatch = useDispatch();

  const getLocation = () => {
    if (navigator.geolocation) {
      const success = (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      };

      const error = (error) => {
        dispatch(createNotification({ type: "error", message: error.message }));
      };

      const options = {
        timeout: 5000,
        maximumAge: 10000,
        enableHighAccuracy: true,
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
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
