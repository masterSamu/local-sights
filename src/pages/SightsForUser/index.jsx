import { useEffect, useState } from "react";
import { getSightsUploadedByUser } from "../../services/sights";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
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
    <Container>
      <h1>Sights uploaded by @{username}</h1>
      <FilterBar />
      <Row xs={1} md={4} className="g-1 card-container">
        {sights.map((sight) => {
          return <SightCard key={sight.id} sight={sight} />;
        })}
      </Row>
    </Container>
  );
};
export default SightsForUser;
