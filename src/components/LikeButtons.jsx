import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import {
  addLike,
  removeLike,
  addDislike,
  removeDislike,
} from "../services/sights";

const LikeButtons = ({ sight, update }) => {
  const user = useSelector((state) => state.user);
  const { likes } = sight;
  console.log("likes", likes);
  console.log("sight likes", sight.likes);
  const likesForCurrentUser = likes.likedUsers.find(
    (item) => item.userId === user?.id
  );
  const userLiked = user?.id === likesForCurrentUser?.userId;

  const removeLikes = async () => {
    if (likesForCurrentUser.type === "positive") {
      await removeLike(sight.id, user.id, likes.positive);
      const likedUsers = likes.likedUsers.filter(
        (item) => item.userId !== user.id
      );
      const newLikes = { ...likes, positive: likes.positive - 1, likedUsers };
      const newSight = { ...sight, likes: newLikes };
      update(newSight);
    } else if (likesForCurrentUser.type === "negative") {
      await removeDislike(sight.id, user.id, likes.negative);
      const likedUsers = likes.likedUsers.filter(
        (item) => item.userId !== user.id
      );
      console.log("remove", likedUsers);
      const newLikes = { ...likes, negative: likes.negative - 1, likedUsers };
      const newSight = { ...sight, likes: newLikes };
      update(newSight);
    }
  };

  const handleAddLike = async () => {
    await addLike(sight.id, user.id);
    const likedUsers = [
      ...likes.likedUsers,
      { userId: user.id, type: "positive" },
    ];
    const newLikes = { ...likes, positive: likes.positive + 1, likedUsers };
    const newSight = { ...sight, likes: newLikes };
    update(newSight);
  };

  const handleAddDislike = async () => {
    await addDislike(sight.id, user.id);
    const likedUsers = [
      ...likes.likedUsers,
      { userId: user.id, type: "negative" },
    ];
    const newLikes = { ...likes, negative: likes.negative + 1, likedUsers };
    const newSight = { ...sight, likes: newLikes };
    update(newSight);
  };

  // Peukutus ei toimi vielä siten, että kun painaa posia niin negatiivinen lähtis.
  const handleLike = async () => {
    if (userLiked) {
      if (likesForCurrentUser.type === "negative") {
        removeLikes();
        handleAddLike();
      }
      removeLikes();
    } else {
      handleAddLike();
    }
  };

  const handleDislike = async () => {
    if (userLiked) {
      if (likesForCurrentUser.type === "positive") {
        removeLikes();
        handleAddDislike();
      }
      removeLikes();
    } else {
      handleAddDislike();
    }
  };

  if (user) {
    return (
      <Row className="like-container">
        <Col>
          <Button
            variant="success"
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
    );
  }
};

export default LikeButtons;
