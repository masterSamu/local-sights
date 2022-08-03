import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const PublicLinks = ({ setExpanded }) => {
  return (
    <>
      <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}>
        Login
      </Nav.Link>
    </>
  );
};

export default PublicLinks;
