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
      const newLikes = { ...likes, negative: likes.negative - 1, likedUsers };
      const newSight = { ...sight, likes: newLikes };
      update(newSight);
    }
  };

  const handleAddLike = async () => {
    await addLike(sight.id, user.id, likes.positive);
    const likedUsers = [
      ...likes.likedUsers,
      { userId: user.id, type: "positive" },
    ];
    const newLikes = { ...likes, positive: likes.positive + 1, likedUsers };
    const newSight = { ...sight, likes: newLikes };
    update(newSight);
  };

  const handleAddDislike = async () => {
    await addDislike(sight.id, user.id, likes.negative);
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
        const response = await addLike(sight.id, user.id, likes.positive);
        if (response) {
          const likedUsers = [
            ...likes.likedUsers,
            { userId: user.id, type: "positive" },
          ];
          let negative = likes.negative;
          if (negative > 0) negative = negative - 1;
          const newLikes = {
            ...likes,
            positive: likes.positive + 1,
            negative,
            likedUsers,
          };
          const newSight = { ...sight, likes: newLikes };
          update(newSight);
        } else {
          console.log("Error in firestore");
        }
        /*
        handleAddLike();*/
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
        await addDislike(sight.id, user.id, likes.negative);
        likesForCurrentUser.type = "negative";
        
        const likedUsers = likes.likedUsers.map((item) =>
          item.id !== user.id ? item : likesForCurrentUser
        );
        /*
        const likedUsers = [
          ...likes.likedUsers,
          { userId: user.id, type: "negative" },
        ];*/
        console.log(likedUsers);
        let positive = likes.positive;
        if (positive > 0) positive = positive - 1;
        const newLikes = {
          ...likes,
          negative: likes.negative + 1,
          positive,
          likedUsers,
        };
        const newSight = { ...sight, likes: newLikes };
        update(newSight);
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
