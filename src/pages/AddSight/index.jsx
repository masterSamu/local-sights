import SightForm from "./SightForm";
import "../../styles/AddSight.css";
import { Container } from "react-bootstrap";

const AddSight = () => {
  return (
    <Container className="main-container">
      <h1>Add new</h1>
      <SightForm />
    </Container>
  );
};

export default AddSight;
