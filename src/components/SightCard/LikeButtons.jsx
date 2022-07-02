import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import {
  updateUsersInLikedUsers,
  removeUserFromLikedUsers,
} from "../../services/sights";

const LikeButtons = ({ sight, update }) => {
  const user = useSelector((state) => state.user);
  const { likes } = sight;
  const likeForCurrentUser = likes.likedUsers.find(
    (item) => item.userId === user?.id
  );

  const handleLikeIfUserHasNoLike = async (likedUser) => {
    const isUserUpdated = await updateUsersInLikedUsers(sight.id, likedUser);
    if (isUserUpdated) {
      const likedUsers = [...likes.likedUsers, likedUser];
      const newLikes = {
        ...likes,
        likedUsers,
      };
      update({ ...sight, likes: newLikes });
    }
  };

  const handleLikeChange = async (likedUser) => {
    const isUserUpdated = await updateUsersInLikedUsers(sight.id, likedUser);
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
  };

  const handleLikeRemove = async () => {
    const likedUsers = likes.likedUsers.filter(
      (item) => item.userId !== user.id
    );

    const newLikes = {
      ...likes,
      likedUsers,
    };
    update({ ...sight, likes: newLikes });
  };

  const handleLike = async () => {
    const likedUser = { userId: user.id, type: "positive" };
    if (likeForCurrentUser) {
      if (likeForCurrentUser.type === "negative") {
        const isDeleted = await removeUserFromLikedUsers(sight.id, {
          ...likedUser,
          type: "negative",
        });
        if (isDeleted) {
          handleLikeChange(likedUser);
        }
      } else {
        const isUserDeleted = await removeUserFromLikedUsers(
          sight.id,
          likedUser
        );
        if (isUserDeleted) {
          handleLikeRemove();
        }
      }
    } else {
      handleLikeIfUserHasNoLike(likedUser);
    }
  };

  const handleDislike = async () => {
    const likedUser = { userId: user.id, type: "negative" };
    if (likeForCurrentUser) {
      if (likeForCurrentUser.type === "positive") {
        const isDeleted = await removeUserFromLikedUsers(sight.id, {
          ...likedUser,
          type: "positive",
        });
        if (isDeleted) {
          handleLikeChange(likedUser);
        }
      } else {
        const isUserDeleted = await removeUserFromLikedUsers(
          sight.id,
          likedUser
        );
        if (isUserDeleted) {
          handleLikeRemove();
        }
      }
    } else {
      handleLikeIfUserHasNoLike(likedUser);
    }
  };

  if (user) {
    return (
      <Row className="like-container">
        <Col>
          <BsFillHandThumbsUpFill
            className={`thumb-icon thumb-icon-up ${
              likeForCurrentUser?.type === "positive" && "thumb-icon-active"
            }`}
            onClick={handleLike}
            data-testid="positive-like"
          />
        </Col>
        <Col>
          <BsFillHandThumbsDownFill
            onClick={handleDislike}
            className={`thumb-icon thumb-icon-down ${
              likeForCurrentUser?.type === "negative" && "thumb-icon-active"
            }`}
            data-testid="negative-like"
          />
        </Col>
      </Row>
    );
  }
};

export default LikeButtons;
