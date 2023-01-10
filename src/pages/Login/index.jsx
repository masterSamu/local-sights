import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userReducer";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../services/user";

/**
 * Login form
 * @returns {ReactElement} Login form
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await userService.login(email, password);
      if (loggedUser) {
        dispatch(setUser(loggedUser));
        localStorage.setItem("user", JSON.stringify(loggedUser));
        navigate("/");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
      setError({ content: error.code, type: "error" });
    }
  };

  return (
    <Container className="main-container">
      <Form onSubmit={handleLogin} className="d-flex flex-column gap-3">
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            required
            isInvalid={email.length < 1}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please write email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div>
          <Button variant="primary" className="px-3" type="submit">
            Login
          </Button>
        </div>
        {error && <Alert variant="danger">{error.content}</Alert>}
      </Form>
      <Link to="/register">Don't have an account yet?</Link>
    </Container>
  );
};

export default Login;
