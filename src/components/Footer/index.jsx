import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            <p>Created by Samu Uunonen. © 2022</p>
          </Col>
          <Col>
            <li>
              <Link to="/privacy">Privacy policy</Link>
            </li>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
