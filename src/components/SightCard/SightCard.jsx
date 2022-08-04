import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/SightCard.css";
import { Link } from "react-router-dom";
import { setSight } from "../../reducers/sightReducer";
import LikeButtons from "./LikeButtons";
import Bookmarked from "./Bookmarked";
const SightCard = ({ sight }) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleUpdate = (newSight) => {
    dispatch(setSight(newSight));
  };

  return (
    <Card className="sight-card" data-testid="sight-card">
      <Bookmarked user={user} sightId={sight.id} />
      <Card.Img variant="top" src={sight.imageUrl} alt={sight.description} />
      <Card.Body>
        <Card.Title id={`title-${sight.name}`}>{sight.name}</Card.Title>
        <Card.Subtitle>{sight.category}</Card.Subtitle>
        <Card.Text>{sight.description}</Card.Text>
        <Row>
          <Col xs={6}>
            <Link
              to={`/sight/${sight.id}`}
              aria-labelledby={`title-${sight.name}`}
            >
              <Button variant="primary">More...</Button>
            </Link>
          </Col>
          <Col xs={6}>
            {user && <LikeButtons sight={sight} update={handleUpdate} />}
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        Uploaded by{" "}
        <Link to={`/sights/${sight.user.username}`}>
          @{sight.user.username}
        </Link>
      </Card.Footer>
    </Card>
  );
};
export default SightCard;
