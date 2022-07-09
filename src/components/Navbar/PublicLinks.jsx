import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const PublicLinks = () => {
  return (
    <>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
    </>
  );
};

export default PublicLinks;
