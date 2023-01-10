import { useState } from "react";
import { Alert, Button, Container, Row } from "react-bootstrap";
import MapboxMap from "./MapboxMap";
import { useDispatch } from "react-redux";
import { MdGpsFixed } from "react-icons/md";
import { createNotification } from "../reducers/notificationReducer";

const Coords = ({ coords, setCoords }) => {
  const [zoom, setZoom] = useState(6); // default zoom for map
  const dispatch = useDispatch();

  const allowGeolocation = () => {
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
    <Container className="coords-container d-flex flex-column gap-3">
      <Container className="px-0">
        <MapboxMap
          coords={coords}
          zoom={zoom}
          height="400px"
          width="100%"
          setCoords={setCoords}
          setZoom={setZoom}
          getLocationEnabled={true}
        />
      </Container>

      <Row>
          <Container>
            <Alert
              variant="info"
            >
              If{" "}
              <Button variant="light" size="sm" className="p-1 mx-1">
                <MdGpsFixed className="fs-5" />
              </Button>{" "}
              button is disabled in map:{" "}
              <Button size="sm" onClick={allowGeolocation} variant="primary">
                Find location
              </Button>
            </Alert>
          </Container>
      </Row>
    </Container>
  );
};

export default Coords;
