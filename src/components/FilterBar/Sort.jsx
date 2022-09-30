import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import { setSightState } from "../../reducers/sightStateReducer";

/**
 * Sort sights component
 * @returns
 */
const Sort = () => {
  const dispatch = useDispatch();
  const sightState = useSelector((state) => state.sightState);

  const orderByPositiveLikes = () => {
    dispatch(setSightState("byPositiveLikes"));
  };

  const orderByNegativeLikes = () => {
    dispatch(setSightState("byNegativeLikes"));
  };

  const orderByLikeCount = () => {
    dispatch(setSightState("byTotalLikes"));
  };

  const orderByNewest = () => {
    dispatch(setSightState("byNewest"));
  };

  return (
    <div className="filterbar-button-group">
      <Button
        variant={sightState === "byTotalLikes" ? "primary" : "outline-primary"}
        onClick={orderByLikeCount}
        data-testid="sort-button-total-likes"
      >
        Total votes
      </Button>
      <Button
        variant={
          sightState === "byPositiveLikes" ? "primary" : "outline-primary"
        }
        onClick={orderByPositiveLikes}
        data-testid="sort-button-thumbs-up"
      >
        <BsFillHandThumbsUpFill />
      </Button>
      <Button
        variant={
          sightState === "byNegativeLikes" ? "primary" : "outline-primary"
        }
        onClick={orderByNegativeLikes}
        data-testid="sort-button-thumbs-down"
      >
        <BsFillHandThumbsDownFill />
      </Button>
      <Button
        variant={sightState === "byRecent" ? "primary" : "outline-primary"}
        onClick={orderByNewest}
        data-testid="sort-button-recent"
      >
        Recent
      </Button>
    </div>
  );
};

export default Sort;
