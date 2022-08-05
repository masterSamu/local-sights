import { useState } from "react";
import { Form, Image } from "react-bootstrap";
import Resizer from "react-image-file-resizer";

const CapturePhoto = ({ setPhoto }) => {
  const [source, setSource] = useState("");

  const handleCapture = async (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const sizeInMb = file.size / 1024 / 1024;
        const resizedImgFile = await resizeImage(file);
        console.log(
          "old:",
          sizeInMb,
          "resized:",
          resizedImgFile.size / 1024 / 1024
        );
        if (sizeInMb > 10) {
          alert(
            "File size excees 10 mb, try to take picture with lower quality"
          );
        } else {
          const newUrl = URL.createObjectURL(resizedImgFile);
          setSource(newUrl);
          setPhoto(resizedImgFile);
        }
      }
    }
  };

  /**
   * Resize image size
   * @param {object} file
   * @returns {object} resized image file
   */
  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "WEBP",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file",
        500,
        500
      );
    });

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
