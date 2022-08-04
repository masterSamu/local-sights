import { useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { BsCheck2Circle, BsExclamationTriangle } from "react-icons/bs";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [show, setShow] = useState(
    localStorage.getItem("cookie-consent") === "accepted" ? false : true
  );

  const handleContinue = () => {
    setShow(false);
    localStorage.setItem("cookie-consent", "accepted");
  };

  if (show) {
      return (
        <Container className="cookie-consent-container">
          <Alert
            variant="warning"
            className="cookie-consent-card"
          >
            <Alert.Heading>
              <BsExclamationTriangle /> Cookie consent
            </Alert.Heading>
    
            <p>
              Continuing using this service, you accept our{" "}
              <Link to="/privacy">Privacy policy</Link>
            </p>
            <Button variant="success" onClick={handleContinue}>
              Accept <BsCheck2Circle />
            </Button>
          </Alert>
        </Container>
      );
  }
};

export default CookieConsent;
