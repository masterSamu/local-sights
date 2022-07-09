import { useState } from "react";
import { Form } from "react-bootstrap";

const PasswordFields = ({ setPassword }) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const validatePassword = () => {
    const match = password1 === password2;
    const length = password1.length > 8;
    if (match && length) {
        setPassword(password1)
    } else {
      if (password1.length > 0 && password2.length > 0) {
        // notification that passwords are not valid
      }
    }
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={(e) => setPassword1(e.target.value)}
          onBlur={validatePassword}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type="password"
          name="password2"
          onChange={(e) => setPassword2(e.target.value)}
          onBlur={validatePassword}
          required
        />
      </Form.Group>
    </>
  );
};

export default PasswordFields;
