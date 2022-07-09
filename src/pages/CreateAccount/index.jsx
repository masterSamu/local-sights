import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { createUser, sendVerificationEmail } from "../../services/user";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isVerificationSent, setVerificationSent] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPasswordValid && isEmailValid) {
      try {
        const user = await createUser(email, password);
        if (user?.email === email) {
          const isEmailSent = sendVerificationEmail();
          if (isEmailSent) {
            setVerificationSent(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validatePassword = () => {
    console.log("validating");
    const match = password === password2;
    const length = password.length > 8;
    if (match && length) {
      setPasswordValid(true);
    } else {
      if (password.length > 0 && password2.length > 0) {
        // notification that passwords are not valid
      }
    }
  };

  const validateEmail = () => {
    const length = email.length > 10;
    if (length) {
      setEmailValid(true);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            required
            isInvalid={email.length < 10}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => validateEmail()}
          />
          <Form.Control.Feedback type="invalid">
            Please write email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      {isVerificationSent && <p>Verification link sent to email</p>}
    </Container>
  );
};

export default CreateAccount;
