import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../styles/SightCard.css";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { addLike, removeLike } from "../services/sights";
import { setSightReducer } from "../reducers/sightReducer";

const SightCard = ({ sight }) => {
  const user = useSelector((state) => state.user);
  const { likes } = sight;
  const dispatch = useDispatch();

  const userLiked =
    user.id ===
    sight.likes.likedUsers.find((item) => item.userId === user.id)?.userId;

  const handleLike = async () => {
    if (userLiked) {
      await removeLike(sight.id, user.id, likes.positive);
      const likedUsers = likes.likedUsers.map((item) => item.id !== user.id);
      const newLikes = { ...likes, positive: likes.positive - 1, likedUsers };
      const newSight = { ...sight, likes: newLikes, likedUsers };
      dispatch(setSightReducer(newSight));
    } else {
      await addLike(sight.id, user.id);
      const likedUsers = [...likes.likedUsers, { userId: user.id }];
      const newLikes = { ...likes, positive: likes.positive + 1, likedUsers };
      const newSight = { ...sight, likes: newLikes };
      dispatch(setSightReducer(newSight));
    }
  };

  const handleDislike = () => {};

  return (
    <Card className="sight-card">
      <Card.Img variant="top" src={sight.imageUrl} />
      <Card.Body>
        <Card.Title>{sight.name}</Card.Title>
        <Card.Subtitle>{sight.category}</Card.Subtitle>
        <Card.Text>{sight.description}</Card.Text>
        <Row>
          <Col xs={6}>
            <Button>More...</Button>
          </Col>
          <Col xs={6}>
            <Row className="like-container">
              <Col>
                <Button
                  variant={userLiked ? "secondary" : "success"}
                  disabled={!user && "disabled"}
                  onClick={handleLike}
                >
                  <BsHandThumbsUp />
                </Button>
                {likes.positive}
              </Col>
              <Col>
                <Button
                  variant="danger"
                  disabled={!user && "disabled"}
                  onClick={handleDislike}
                >
                  <BsHandThumbsDown />
                </Button>
                {likes.negative}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>Uploaded by @{sight.userId}</Card.Footer>
    </Card>
  );
};
export default SightCard;
