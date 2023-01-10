import SightForm from "./SightForm";
import "../../styles/AddSight.css";
import { Alert, Container } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";

const AddSight = () => {
  return (
    <Container className="main-container">
      <h1>Add new sight</h1>
      <BrowserView>
        <Container>
          <Alert variant="warning">
            <p>
              Looks like you are not using mobile device. It is possible to add
              sights only with mobile devices. This is because we want to make
              sure, that you are at the location of the sight and taking photo
              with your device.
            </p>
          </Alert>
        </Container>
      </BrowserView>
      <MobileView>
        <SightForm />
      </MobileView>
    </Container>
  );
};

export default AddSight;
