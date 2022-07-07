import SightForm from "./SightForm";
import "../../styles/AddSight.css";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddSight = () => {
  const user = useSelector((state) => state.user);

  if (user) {
    return (
      <Container>
        <SightForm />
      </Container>
    );
  }
};

export default AddSight;
