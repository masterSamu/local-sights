import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { setSights } from "../../reducers/sightReducer";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import { useState, useEffect } from "react";
import sightService from "../../services/sights";

/**
 * Sort sights component
 * @returns
 */
const Sort = () => {
  const sights = useSelector((state) => state.sights);
  const dispatch = useDispatch();
  const [originalSights, setOriginalSights] = useState([]);
  const [orderedBy, setOrderedBy] = useState("");

  useEffect(() => {
    if (
      orderedBy === "" &&
      originalSights.length === 0 &&
      sights.length === 0
    ) {
      sightService.getAll().then((data) => {
        if (data) {
          dispatch(setSights(data));
        }
      });
    }
  }, [orderedBy, sights, dispatch, originalSights.length]);

  const orderByPositiveLikes = () => {
    if (orderedBy === "positive") {
      dispatch(setSights(originalSights));
      setOrderedBy("");
    } else {
      setOriginalSights(sights);
      const newSights = [...sights].sort(
        (a, b) => b.likes.positive - a.likes.positive
      );
      dispatch(setSights(newSights));
      setOrderedBy("positive");
    }
  };

  const orderByNegativeLikes = () => {
    if (orderedBy === "negative") {
      dispatch(setSights(originalSights));
      setOrderedBy("");
    } else {
      setOriginalSights(sights);
      const newSights = [...sights].sort(
        (a, b) => b.likes.negative - a.likes.negative
      );
      dispatch(setSights(newSights));
      setOrderedBy("negative");
    }
  };

  const orderByLikeCount = () => {
    if (orderedBy === "total-likes") {
      dispatch(setSights(originalSights));
      setOrderedBy("");
    } else {
      setOriginalSights(sights);
      const newSights = [...sights].sort((a, b) => {
        const aTotalLikes = a.likes.negative + a.likes.positive;
        const bTotalLikes = b.likes.negative + b.likes.positive;
        return bTotalLikes - aTotalLikes;
      });
      dispatch(setSights(newSights));
      setOrderedBy("total-likes");
    }
  };

  return (
    <div className="filterbar-button-group">
      <Button
        variant={orderedBy === "total-likes" ? "primary" : "outline-primary"}
        onClick={orderByLikeCount}
        data-testid="sort-button-total-likes"
      >
        Total votes
      </Button>
      <Button
        variant={orderedBy === "positive" ? "primary" : "outline-primary"}
        onClick={orderByPositiveLikes}
        data-testid="sort-button-thumbs-up"
      >
        <BsFillHandThumbsUpFill />
      </Button>
      <Button
        variant={orderedBy === "negative" ? "primary" : "outline-primary"}
        onClick={orderByNegativeLikes}
        data-testid="sort-button-thumbs-down"
      >
        <BsFillHandThumbsDownFill />
      </Button>
    </div>
  );
};

export default Sort;
