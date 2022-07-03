import { useState } from "react";
import { Form, Image } from "react-bootstrap";

const CapturePhoto = ({setPhoto}) => {
  const [source, setSource] = useState("");

  const handleCapture = async (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        console.log("size: ", file.size /1024 /1024)
        const sizeInMb = file.size / 1024 / 1024;
        if (sizeInMb > 10) {
            alert("File size excees 10 mb");
        } else {
            //const resized = await resizeFile(file);
            const newUrl = URL.createObjectURL(file);
            setSource(newUrl);
            setPhoto(file);
        }
      }
    }
  };
  return (
    <Form.Group controlId="validationFile">
      <Form.Label>Photo</Form.Label>
      <Form.Control
        required
        type="file"
        accept="image/*"
        capture="environment"
        onChange={({ target }) => handleCapture(target)}
        name="photo"
      />
      <Form.Control.Feedback>Looks good</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        Photo is required
      </Form.Control.Feedback>
      <div className="photo-container">
        <Image
          src={source}
          alt="preview of captured photo"
          id="photo-preview"
        />
      </div>
    </Form.Group>
  );
};

export default CapturePhoto;
