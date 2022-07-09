import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PublicLinks from "./PublicLinks";
import ProtectedLinks from "./ProtectedLinks";

const Navigationbar = ({ logOut }) => {
  const user = useSelector((state) => state.user);
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          LocalSights
        </Navbar.Brand>
      </Container>
      <Nav className="me-auto">
        {user ? <ProtectedLinks logOut={logOut} /> : <PublicLinks />}
      </Nav>
    </Navbar>
  );
};

export default Navigationbar;
