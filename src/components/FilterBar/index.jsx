import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Filter from "./Filter";
import Sort from "./Sort";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const FilterBar = () => {
  const [show, setShow] = useState(false);

  const toggleFilterBar = () => {
    setShow(!show);
  };

  return (
    <Card className="filterbar-card">
      <Card.Header>
        <Button onClick={toggleFilterBar}>
          FIlter/Sort <span>{show ? <BsArrowUp /> : <BsArrowDown />}</span>
        </Button>
      </Card.Header>
      {show && (
        <Card.Body>
          <Card.Title>Sort</Card.Title>
          <Sort />
          <Card.Title>Filter</Card.Title>
          <Filter />
        </Card.Body>
      )}
    </Card>
  );
};

export default FilterBar;
