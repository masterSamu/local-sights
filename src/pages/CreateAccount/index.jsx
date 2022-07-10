import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../reducers/userReducer";
import { createUser, sendVerificationEmail } from "../../services/user";
import EmailField from "./EmailField";
import PasswordFields from "./PasswordFields";
import UsernameField from "./UsernameField";

const CreateAccount = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && email && username) {
      const user = await createUser(email, password, username);
      if (user?.email === email) {
        dispatch(setUser(user));
        const isEmailSent = await sendVerificationEmail();
        if (isEmailSent) {
          navigate("/");
          /** @todo: Notification that email has been sent to user */
        }
      } else if (user?.error) {
        /**@todo: Notification message here from user.error*/
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <UsernameField setUsername={setUsername} />
        <EmailField setEmail={setEmail} />
        <PasswordFields setPassword={setPassword} />
        <Button variant="primary" type="submit">
          Create account
        </Button>
      </Form>
    </Container>
  );
};

export default CreateAccount;
