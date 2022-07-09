import { useState } from "react";
import { Form } from "react-bootstrap";
import { getAllUsers } from "../../services/user";

const UsernameField = ({setUsername}) => {
  const [input, setInput] = useState("");

  const handleChange = () => {

  }

  const validateUsername =  () => {
    const allUsers = getAllUsers(input);
    console.log(allUsers)
  }

  return (
    <Form.Group className="mb-3" controlId="formBasicUsername">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        name="username"
        placeholder="Username that is visible to other users"
        onChange={({ target }) => setInput(target.value)}
        onBlur={validateUsername}
        required
      />
    </Form.Group>
  );
};

export default UsernameField;
