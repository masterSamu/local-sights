import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { checkUsernameAvailability } from "../../services/user";

const UsernameField = ({ setUsername }) => {
  const [input, setInput] = useState("");
  const [isAvailable, setAvailable] = useState(false);
  const [isValid, setValid] = useState(false);
  const [isChanged, setChanged] = useState(false);

  useEffect(() => {
    if (input.length >= 5 && isAvailable && isValid) {
      setUsername(input);
    }
  }, [input, isAvailable, isValid, setUsername]);

  const handleChange = (value) => {
    setChanged(true);
    setInput(value);

    if (value.length >= 5) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const validateUsername = async () => {
    const available = await checkUsernameAvailability(input);
    if (available) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  };

  return (
    <Form.Group className="mb-3" controlId="formBasicUsername">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        name="username"
        placeholder="Username that is visible to other users"
        onChange={({ target }) => handleChange(target.value)}
        onBlur={validateUsername}
        required
        isInvalid={isChanged && (!isAvailable || !isValid)}
        isValid={isChanged && (isAvailable || isValid)}
      />

      {!isAvailable && (
        <Form.Control.Feedback type="invalid">
          Username is already reserved
        </Form.Control.Feedback>
      )}

      {!isValid && (
        <Form.Control.Feedback type="invalid">
          Username is less than 5 characters long
        </Form.Control.Feedback>
      )}
      {isValid && isAvailable && (
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default UsernameField;
