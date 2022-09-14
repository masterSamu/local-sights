import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PublicLinks from "./PublicLinks";
import ProtectedLinks from "./ProtectedLinks";
import { useState } from "react";
import OfflineBadge from "../OfflineBadge";

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
          <img
            src={process.env.PUBLIC_URL + "/logo-without-text.png"}
            alt="Local Sights logo with mountains"
            aria-labelledby="brand-logo"
          />
          <span id="brand-logo">Local Sights</span>
        </Navbar.Brand>
        <OfflineBadge />

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!isExpanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {user ? (
              <ProtectedLinks logOut={logOut} setExpanded={setExpanded} />
            ) : (
              <PublicLinks setExpanded={setExpanded} />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
