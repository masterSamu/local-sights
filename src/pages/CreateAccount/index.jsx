import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUser, sendVerificationEmail } from "../../services/user";
import EmailField from "./EmailField";
import PasswordFields from "./PasswordFIelds";
import UsernameField from "./UsernameField";

const CreateAccount = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [isVerificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();
  console.log("username:", username)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && email) {
      const user = await createUser(email, password, username);
      console.log(user);
      if (user?.email === email) {
        const isEmailSent = sendVerificationEmail();
        if (isEmailSent) {
          setVerificationSent(true);
          //navigate("/register/profile");
        }
      } else if (user?.error) {
        // Notification message here from user.error
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
      {isVerificationSent && <p>Verification link sent to email</p>}
    </Container>
  );
};

export default CreateAccount;
