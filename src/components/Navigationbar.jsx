import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navigationbar = ({ logOut }) => {
  const user = useSelector((state) => state.user);
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="/">LocalSights</Navbar.Brand>
      </Container>
      <Nav className="me-auto">
        <ProtectedLinks user={user} logOut={logOut} />
      </Nav>
    </Navbar>
  );
};

const ProtectedLinks = ({ user, logOut }) => {
  if (user) {
    return (
      <>
        <Nav.Link as={Link} to="/add">
          Add
        </Nav.Link>
        <Nav.Link onClick={logOut}>Logout</Nav.Link>
      </>
    );
  } else {
    return (
      <>
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
      </>
    );
  }
};

export default Navigationbar;
