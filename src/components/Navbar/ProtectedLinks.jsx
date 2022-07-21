import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProtectedLinks = ({ logOut }) => {
  return (
    <>
      <Nav.Link as={Link} to="/sight/add">
        Add
      </Nav.Link>
      <Nav.Link as={Link} to="/bookmarks">
        Bookmarks
      </Nav.Link>
      <Nav.Link onClick={logOut}>Logout</Nav.Link>
    </>
  );
};

export default ProtectedLinks;
