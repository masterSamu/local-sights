import { useEffect, useState } from "react";
import { getSightsUploadedByUser } from "../../services/sights";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import FilterBar from "../../components/FilterBar";
import SightCard from "../../components/SightCard/SightCard";
import { useDispatch } from "react-redux";
import { createNotification } from "../../reducers/notificationReducer";

const SightsForUser = () => {
  const username = useParams().username;
  const [sights, setSights] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getSightsUploadedByUser(username)
      .then((data) => setSights(data))
      .catch(() => {
        const message = "Error happened, could not download data";
        dispatch(createNotification({ type: "error", message }));
      });
  }, [sights, username, dispatch]);

  return (
    <Container className="main-container">
      <h1>Sights uploaded by @{username}</h1>
      <FilterBar />
      <Row xs={1} sm={1} md={2} xl={3} className="g-4 card-container">
        {sights.length > 0 ? (
          sights.map((sight) => {
            return (
              <Col key={sight.id}>
                <SightCard sight={sight} />
              </Col>
            );
          })
        ) : (
          <p>Looks like @{username} has not uplaoaded any sights yet.</p>
        )}
      </Row>
    </Container>
  );
};
export default SightsForUser;
