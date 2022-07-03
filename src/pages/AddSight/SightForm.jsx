import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import CapturePhoto from "../../components/CapturePhoto";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";

const SightForm = () => {
  const user = useSelector((state) => state.user);
  const [validated, setValidated] = useState(false);
  const [photo, setPhoto] = useState(null);

  const uploadFile = (fileName) => {
    const storage = getStorage();
    const sightsRef = ref(storage, `images/sights/${user.id}/${fileName}`);

    const uploadTask = uploadBytesResumable(sightsRef, photo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
    } else {
      uploadFile(e.target.name.value);
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
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

      <Button type="submit">Save</Button>
    </Form>
  );
};

export default SightForm;
