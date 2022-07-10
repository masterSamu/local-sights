import { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";

const EmailField = ({ setEmail }) => {
  const [input, setInput] = useState("");
  const [isChanged, setChanged] = useState(false);
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    if (isValid) {
      setEmail(input);
    }
  }, [setEmail, input, isValid]);

  const handleChange = (value) => {
    setChanged(true);
    setInput(value);
  };

  const validateEmail = () => {
    const length = input.length > 10;
    const re = /\S+@\S+\.\S+/;
    const isEmail = re.test(input);
    if (length && isEmail) {
      setValid(true);
    } else {
      setValid(false);
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
          isInvalid={isChanged && input.length < 10 && !isValid}
          isValid={isChanged && isValid}
          onChange={({ target }) => handleChange(target.value)}
          onBlur={validateEmail}
        />
        {isChanged && !isValid && (
          <Form.Control.Feedback type="invalid">
            Invalid email
          </Form.Control.Feedback>
        )}
        {isChanged && isValid && (
          <Form.Control.Feedback>Looks good</Form.Control.Feedback>
        )}
      </Form.Group>
    </>
  );
};

export default EmailField;
