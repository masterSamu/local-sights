import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import {
  updateUsersInLikedUsers,
  removeUserFromLikedUsers,
} from "../services/sights";

const LikeButtons = ({ sight, update }) => {
  const user = useSelector((state) => state.user);
  const { likes } = sight;
  console.log("likes", likes);
  const likesForCurrentUser = likes.likedUsers.find(
    (item) => item.userId === user?.id
  );

  console.log("user likes:", likesForCurrentUser);

  const handleLike = async () => {
    const likedUser = { userId: user.id, type: "positive" };
    if (likesForCurrentUser) {
      if (likesForCurrentUser.type === "negative") {
        const isDeleted = await removeUserFromLikedUsers(sight.id, {
          ...likedUser,
          type: "negative",
        });
        if (isDeleted) {
          const isUserUpdated = await updateUsersInLikedUsers(
            sight.id,
            likedUser
          );
          if (isUserUpdated) {
            const likedUsers = likes.likedUsers.map((item) =>
              item.userId !== user.id ? item : likedUser
            );
            const newLikes = {
              ...likes,
              likedUsers,
            };
            update({ ...sight, likes: newLikes });
          }
        }
      } else {
        const isUserDeleted = await removeUserFromLikedUsers(
          sight.id,
          likedUser
        );
        if (isUserDeleted) {
          const likedUsers = likes.likedUsers.filter(
            (item) => item.userId !== user.id
          );

          const newLikes = {
            ...likes,
            likedUsers,
          };
          update({ ...sight, likes: newLikes });
        }
      }
    } else {
      const isUserUpdated = await updateUsersInLikedUsers(sight.id, likedUser);
      if (isUserUpdated) {
        const likedUsers = [...likes.likedUsers, likedUser];
        const newLikes = {
          ...likes,
          likedUsers,
        };
        update({ ...sight, likes: newLikes });
      }
    }
  };

  const handleDislike = async () => {
    const likedUser = { userId: user.id, type: "negative" };
    if (likesForCurrentUser) {
      if (likesForCurrentUser.type === "positive") {
        const isDeleted = await removeUserFromLikedUsers(sight.id, {
          ...likedUser,
          type: "positive",
        });
        if (isDeleted) {
          const isUserUpdated = await updateUsersInLikedUsers(
            sight.id,
            likedUser
          );
          if (isUserUpdated) {
            const likedUsers = likes.likedUsers.map((item) =>
              item.userId !== user.id ? item : likedUser
            );
            const newLikes = {
              ...likes,
              likedUsers,
            };
            update({ ...sight, likes: newLikes });
          }
        }
      } else {
        const isUserDeleted = await removeUserFromLikedUsers(
          sight.id,
          likedUser
        );
        if (isUserDeleted) {
          const likedUsers = likes.likedUsers.filter(
            (item) => item.userId !== user.id
          );

          const newLikes = {
            ...likes,
            likedUsers,
          };
          update({ ...sight, likes: newLikes });
        }
      }
    } else {
      const isUserUpdated = await updateUsersInLikedUsers(sight.id, likedUser);
      if (isUserUpdated) {
        const likedUsers = [...likes.likedUsers, likedUser];
        const newLikes = {
          ...likes,
          likedUsers,
        };
        update({ ...sight, likes: newLikes });
      }
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
        type: {likesForCurrentUser?.type}
      </Row>
    );
  }
};

export default LikeButtons;
