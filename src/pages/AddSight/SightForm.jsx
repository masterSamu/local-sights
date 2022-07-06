import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
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

const SightForm = () => {
  const user = useSelector((state) => state.user);
  const [validated, setValidated] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [coords, setCoords] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadData = async (formData) => {
    const userId = user.id;
    const name = formData.name.value;
    const storage = getStorage();
    const sightsRef = ref(storage, `images/sights/${userId}/${name}`);

    const uploadTask = uploadBytesResumable(sightsRef, photo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
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
            userId,
            coords,
            imageUrl: downloadURL,
            likes,
            comments: [],
          };
          addSight(sight).then((id) => {
            if (id) {
              sight.id = id;
              dispatch(createSight(sight));
              navigate("/");
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
    <Form noValidate validated={validated} onSubmit={handleSubmit} id="sight-form">
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
          Name of the place is required
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
          onKeyDown={(e) => e.preventDefault()}
          value={coords ? `${coords?.longitude} , ${coords?.latitude}` : ""}
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
    </Form>
  );
};

export default SightForm;
