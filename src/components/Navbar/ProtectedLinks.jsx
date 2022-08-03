import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProtectedLinks = ({ logOut, setExpanded }) => {
  const handleLogout = () => {
    logOut();
    setExpanded(false);
  };

  return (
    <>
      <Nav.Link as={Link} to="/sight/add" onClick={() => setExpanded(false)}>
        Add sight
      </Nav.Link>

      <Nav.Link as={Link} to="/bookmarks" onClick={() => setExpanded(false)}>
        Bookmarks
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </>
  );
};

export default ProtectedLinks;
