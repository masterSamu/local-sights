import { Container, Spinner } from "react-bootstrap";

/**
 * Spinner component to indicate loading process
 * @param {{isLoading: boolean}} props 
 * @returns {ReactElement}
 */
const LoaderSpinner = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center my-5">
        <Spinner animation="border" variant="secondary" />
      </Container>
    );
  }
};

export default LoaderSpinner;
