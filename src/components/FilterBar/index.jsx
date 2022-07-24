import { Button, Card } from "react-bootstrap";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setSights } from "../../reducers/sightReducer";

const FilterBar = () => {
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

  return (
    <Card className="filter-card">
      <Card.Header>Order sights</Card.Header>
      <Card.Body>
        <Button variant="primary" onClick={orderByPositiveLikes}>
          <BsFillHandThumbsUpFill />
        </Button>

        <Button variant="primary" onClick={orderByNegativeLikes}>
          <BsFillHandThumbsDownFill />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;
