import { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";

const PasswordFields = ({ setPassword }) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isValid, setValid] = useState(false);
  const [isChanged, setChanged] = useState(false);
  const [isMatch, setMatch] = useState(false);
  const [isPass1Valid, setPass1Valid] = useState(false);

  useEffect(() => {
    if (isValid) {
      setPassword(password1);
    }
  }, [setPassword, password1, isValid]);

  const validatePassword = () => {
    if (!isChanged) setChanged(true);
    const match = password1 === password2;
    if (match) {
      setMatch(true);
      setValid(true);
    } else {
      setMatch(false);
      setValid(false);
    }
  };

  const handlePassword1Change = (value) => {
    if (!isChanged) setChanged(true);
    const re = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,36})\S$/;
    const valid = re.test(value);
    if (valid) {
      setPassword1(value);
      setPass1Valid(true);
    } else {
      setPass1Valid(false);
    }
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={({ target }) => handlePassword1Change(target.value)}
          onBlur={validatePassword}
          required
          isInvalid={isChanged && !isPass1Valid}
          isValid={isChanged && isPass1Valid}
        />
        {isChanged && !isPass1Valid && (
          <Form.Control.Feedback type="invalid">
            Password must be 8-36 characters long, contain an upper- and
            lowercase letter and a number between 0-9
          </Form.Control.Feedback>
        )}

        {isPass1Valid && (
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type="password"
          name="password2"
          onChange={(e) => setPassword2(e.target.value)}
          onBlur={validatePassword}
          required
          isInvalid={isChanged && !isValid}
          isValid={isChanged && isValid}
        />
        {isChanged && !isMatch && (
          <Form.Control.Feedback type="invalid">
            Passwords are not equal, rewrite it carefully.
          </Form.Control.Feedback>
        )}
        {isValid && <Form.Control.Feedback>Looks good!</Form.Control.Feedback>}
      </Form.Group>
    </>
  );
};

export default PasswordFields;
