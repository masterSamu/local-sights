import { useState } from "react";
import { Alert, Button, Container, Row } from "react-bootstrap";
import MapboxMap from "./MapboxMap";
import { useDispatch } from "react-redux";
import { MdGpsFixed } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { createNotification } from "../reducers/notificationReducer";

const Coords = ({ coords, setCoords }) => {
  const [zoom, setZoom] = useState(6); // default zoom for map
  const [isHintVisible, setHintVisible] = useState(true);
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
    <Container className="coords-container">
      <Row>
        {isHintVisible && (
          <Alert
            variant="info"
            onClose={() => setHintVisible(false)}
            dismissible
          >
            <Alert.Heading>
              <BsInfoCircle /> Hint
            </Alert.Heading>
            Press <MdGpsFixed /> icon from top-right of the map to locate your
            current location. <br></br>If icon is disabled, get your location by
            pressing{" "}
            <Button size="sm" onClick={allowGeolocation} variant="primary">
              this
            </Button>
          </Alert>
        )}
      </Row>

      <Row>
        <MapboxMap
          coords={coords}
          zoom={zoom}
          height="50vh"
          width="100%"
          setCoords={setCoords}
          setZoom={setZoom}
          getLocationEnabled={true}
        />
      </Row>
    </Container>
  );
};

export default Coords;
