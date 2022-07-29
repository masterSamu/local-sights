import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSights } from "../../reducers/sightReducer";

const Filter = () => {
  const sights = useSelector((state) => state.sights);
  const dispatch = useDispatch();

  const hasLikes = () => {
    const newSights = [...sights].filter(
      ({ likes }) => likes.positive + likes.negative > 0
    );
    dispatch(setSights(newSights));
  };

  return (
    <div className="filterbar-button-group">
      <Button
        variant="primary"
        onClick={hasLikes}
        data-testid="filter-button-has-likes"
      >
        Has likes
      </Button>
    </div>
  );
};

export default Filter;
