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
  const likesForCurrentUser = likes.likedUsers.find(
    (item) => item.userId === user?.id
  );
  const hasUserLikedThis = user?.id === likesForCurrentUser?.userId;

  console.log("user:", likesForCurrentUser);

  // Ongelma on kun peukutus on poistettu, se päivittää reducerin,
  // mutta päivitys ei tapahdu ennenkuin HandleAddDislike/-Like funktio päivittää
  // saman reducrein.
  const removeLikes = async () => {
    if (likesForCurrentUser.type === "positive") {
      console.log("removing positive likes", likesForCurrentUser.type);
      await removeLike(sight.id, user.id, likes.positive);
      console.log("likedUsers before filter", likes.likedUsers)
      const likedUsers = likes.likedUsers.filter(
        (item) => item.userId !== user.id
      );
      console.log("removed positive likes", likedUsers);
      const newLikes = { ...likes, positive: likes.positive - 1, likedUsers };
      const newSight = { ...sight, likes: newLikes };
      //update(newSight);
    } else if (likesForCurrentUser.type === "negative") {
      console.log("removing negative likes", likesForCurrentUser.type);
      await removeDislike(sight.id, user.id, likes.negative);
      console.log("likedUsers before filter", likes.likedUsers)
      const likedUsers = likes.likedUsers.filter(
        (item) => item.userId !== user.id
      );
      console.log("removed negative likes", likedUsers);
      const newLikes = { ...likes, negative: likes.negative - 1, likedUsers };
      const newSight = { ...sight, likes: newLikes };
      //update(newSight);
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
    console.log("LIKE");
    if (hasUserLikedThis) {
      if (likesForCurrentUser.type === "negative") {
        console.log("current is negative");
        removeLikes();
        handleAddLike();
      } else {
        removeLikes();
      }
    } else {
      console.log("No likes in memory");
      handleAddLike();
    }
  };

  const handleDislike = async () => {
    console.log("DISLIKE");
    if (hasUserLikedThis) {
      if (likesForCurrentUser.type === "positive") {
        console.log("current is positive");
        removeLikes();
        handleAddDislike();
      } else {
        removeLikes();
      }
    } else {
      console.log("No likes in memory");
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
