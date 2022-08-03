import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PublicLinks from "./PublicLinks";
import ProtectedLinks from "./ProtectedLinks";
import { useState } from "react";

const Navigationbar = ({ logOut }) => {
  const user = useSelector((state) => state.user);
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Navbar
      bg="light"
      collapseOnSelect
      expand="sm"
      sticky="top"
      expanded={isExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          LocalSights
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!isExpanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {user ? (
              <ProtectedLinks logOut={logOut} setExpanded={setExpanded} />
            ) : (
              <PublicLinks />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
