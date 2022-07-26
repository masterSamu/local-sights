import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSights } from "../../reducers/sightReducer";

const Filter = () => {
  const [show, setShow] = useState(false);
  const sights = useSelector((state) => state.sights);
  const dispatch = useDispatch();

  const hasLikes = () => {
    const newSights = [...sights].filter(
      ({ likes }) => likes.positive + likes.negative > 0
    );
    dispatch(setSights(newSights));
  };

  return (
    <>
      <Card>
        <Card.Header>
          <Button variant="primary" onClick={() => setShow(!show)}>
            Filter options
          </Button>
        </Card.Header>
        {show && (
          <Card.Body>
            <Button
              variant="primary"
              onClick={hasLikes}
              data-testid="filter-button-has-likes"
            >
              Has likes
            </Button>
          </Card.Body>
        )}
      </Card>
    </>
  );
};

export default Filter;
