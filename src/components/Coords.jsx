import { useState } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import MapboxMap from "./MapboxMap";

import { MdGpsFixed } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";

const Coords = ({ coords, setCoords }) => {
  const [zoom, setZoom] = useState(6); // default zoom for map
  const [isHintVisible, setHintVisible] = useState(true);

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
            current location
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
