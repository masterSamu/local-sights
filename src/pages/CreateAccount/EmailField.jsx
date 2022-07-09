import { useState } from "react";
import { Form } from "react-bootstrap";

const EmailField = ({ setEmail }) => {
  const [input, setInput] = useState("");
  const validateEmail = () => {
    const length = input.length > 10;
    if (length) {
      setEmail(input);
    }
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          required
          isInvalid={input.length < 10}
          onChange={(e) => setInput(e.target.value)}
          onBlur={(e) => validateEmail()}
        />
        <Form.Control.Feedback type="invalid">
          Please write email
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default EmailField;
