import { useDispatch, useSelector } from "react-redux";
import {  Button } from "react-bootstrap";
import { setSights } from "../../reducers/sightReducer";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";

const Sort = () => {
  const sights = useSelector((state) => state.sights);
  const dispatch = useDispatch();

  const orderByPositiveLikes = () => {
    const newSights = [...sights].sort(
      (a, b) => b.likes.positive - a.likes.positive
    );
    dispatch(setSights(newSights));
  };

  const orderByNegativeLikes = () => {
    const newSights = [...sights].sort(
      (a, b) => b.likes.negative - a.likes.negative
    );
    dispatch(setSights(newSights));
  };

  const orderByLikeCount = () => {
    const newSights = [...sights].sort((a, b) => {
      const aTotalLikes = a.likes.negative + a.likes.positive;
      const bTotalLikes = b.likes.negative + b.likes.positive;
      return bTotalLikes - aTotalLikes;
    });
    dispatch(setSights(newSights));
  };

  return (
    <div className="filterbar-button-group">
      <Button
        variant="primary"
        onClick={orderByLikeCount}
        data-testid="sort-button-total-likes"
      >
        Total votes
      </Button>
      <Button
        variant="primary"
        onClick={orderByPositiveLikes}
        data-testid="sort-button-thumbs-up"
      >
        <BsFillHandThumbsUpFill />
      </Button>
      <Button
        variant="primary"
        onClick={orderByNegativeLikes}
        data-testid="sort-button-thumbs-down"
      >
        <BsFillHandThumbsDownFill />
      </Button>
    </div>
  );
};

export default Sort;
