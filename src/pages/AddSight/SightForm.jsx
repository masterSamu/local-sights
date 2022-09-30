import { useState } from "react";
import { Button, Col, Form, Row, Spinner, Container } from "react-bootstrap";
import CapturePhoto from "../../components/CapturePhoto";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { addSight } from "../../services/sights";
import Coords from "../../components/Coords";
import { createSight } from "../../reducers/sightReducer";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../../reducers/notificationReducer";
import { useEffect } from "react";
import axios from "axios";

const SightForm = () => {
  const user = useSelector((state) => state.user);
  const [validated, setValidated] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [coords, setCoords] = useState(null);
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (coords) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?types=place&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            const place = response.data.features[0].place_name;
            const placeStringAsArray = place.split(",");
            const city = placeStringAsArray[0].trim().toLowerCase();
            const area = placeStringAsArray[1].trim().toLowerCase();
            const country = placeStringAsArray[2].trim().toLowerCase();
            setLocation({ city, area, country });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [coords]);

  const uploadData = async (formData) => {
    const userId = user.id;
    const name = formData.name.value;
    const storage = getStorage();
    const sightsRef = ref(storage, `images/sights/${name.replace(/\s/g, "_")}`);
    const metadata = {
      customMetadata: {
        userId: userId,
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    };

    const uploadTask = uploadBytesResumable(sightsRef, photo, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress < 100) {
          setLoading(true);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const description = formData.description.value;
          const likes = { positive: 0, negative: 0, likedUsers: [] };
          const sight = {
            name,
            description,
            user: { id: userId, username: user.username },
            coords,
            imageUrl: downloadURL,
            likes,
            comments: [],
            location,
            createdAt: Date.now()
          };
          addSight(sight).then((id) => {
            if (id) {
              setLoading(false);
              sight.id = id;
              dispatch(createSight(sight));
              navigate("/");
              const message = `New sight "${sight.name}" has been added`;
              dispatch(createNotification({ message, type: "success" }));
              setPhoto(null);
              setCoords(null);
            }
          });
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() && coords && photo) {
      uploadData(e.target);
    } else {
    }
    setValidated(true);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      id="sight-form"
    >
      <Form.Group controlId="validationName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Name of the place"
          name="name"
        />
        <Form.Control.Feedback>Looks good</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Name is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="validationDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Describe the place"
          name="description"
        />
        <Form.Control.Feedback>Looks good</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Description is required
        </Form.Control.Feedback>
      </Form.Group>

      <CapturePhoto setPhoto={setPhoto} />
      <Coords setCoords={setCoords} coords={coords} />

      <Form.Group controlId="validationCoordinates">
        <Form.Label>Coordinates</Form.Label>
        <Form.Control
          required
          type="text"
          name="coordinates"
          onChange={(e) => e.preventDefault()}
          onKeyDown={(e) => e.preventDefault()}
          value={
            coords
              ? `long: ${coords?.longitude} , lat: ${coords?.latitude}`
              : ""
          }
        />
        <Form.Control.Feedback>Looks good</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Coordinates is required
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Col>
      </Row>
      {isLoading && (
        <Row className="loading-spinner-row">
          <Container className="loading-spinner-container">
            <Spinner
              variant="secondary"
              animation="border"
              className="loading-spinner"
              role="status"
            >
              <span hidden>Loading...</span>
            </Spinner>
            <p>Loading...</p>
          </Container>
        </Row>
      )}
    </Form>
  );
};

export default SightForm;
