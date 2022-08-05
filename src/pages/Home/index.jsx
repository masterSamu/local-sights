import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../../components/FilterBar";
import SearchBar from "../../components/SearchBar";
import SightCard from "../../components/SightCard/SightCard";
import sightService from "../../services/sights";

import { setSights } from "../../reducers/sightReducer";
import { createNotification } from "../../reducers/notificationReducer";
import { BsArrowClockwise } from "react-icons/bs";

const Home = () => {
  const sights = useSelector((state) => state.sights);
  const dispatch = useDispatch();

  const fetchSights = () => {
    sightService
      .getAll()
      .then((data) => {
        if (data.length > 0) {
          dispatch(setSights(data));
        }
      })
      .catch((error) => {
        dispatch(createNotification({ type: "error", message: error.message }));
      });
  };

  return (
    <Container className="main-container">
      <h1 hidden>Sights</h1>
      <SearchBar />
      <FilterBar />
      <Row xs={1} sm={1} md={2} xl={3} className="g-4 card-container">
        {sights.map((sight) => {
          return (
            <Col key={sight.id}>
              <SightCard sight={sight} />
            </Col>
          );
        })}
      </Row>
      {sights.length === 0 && (
        <Container className="reload-data-button-container">
          <Button variant="light" onClick={fetchSights} size="lg">
            Refresh <BsArrowClockwise />
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default Home;
