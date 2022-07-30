import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSights } from "../../reducers/sightReducer";

/**
 * Filter sights component
 * @returns
 */
const Filter = () => {
  const sights = useSelector((state) => state.sights);
  const dispatch = useDispatch();
  const [originalSights, setOriginalSights] = useState([]);
  const [hasLikesActive, setHasLikeActive] = useState(false);

  const hasLikes = () => {
    if (hasLikesActive) {
      dispatch(setSights(originalSights));
    } else {
      setOriginalSights(sights);
      const newSights = [...sights].filter(
        ({ likes }) => likes.positive + likes.negative > 0
      );
      dispatch(setSights(newSights));
    }
    setHasLikeActive(!hasLikesActive);
  };

  return (
    <div className="filterbar-button-group">
      <Button
        variant={hasLikesActive ? "primary" : "outline-primary"}
        onClick={hasLikes}
        data-testid="filter-button-has-likes"
      >
        Has likes
      </Button>
    </div>
  );
};

export default Filter;
