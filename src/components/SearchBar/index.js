import { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSights } from "../../reducers/sightReducer";
import { searchSightsByArea } from "../../services/sights";
import areaData from "../../utils/data/areas_in_finland.json";
import { createNotification } from "../../reducers/notificationReducer";
import { BsFillBackspaceFill } from "react-icons/bs";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (input.trim().length === 0) {
      setSuggestions([]);
    }
    const isInAreas = areaData.areas.includes(input);
    if (input.trim().length > 2 && !isInAreas) {
      setSuggestions(
        areaData.areas.filter((area) => area.includes(input.toLowerCase()))
      );
    }
  }, [input]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (input.trim().length > 2) {
      try {
        const newSights = await searchSightsByArea(input);
        dispatch(setSights(newSights));
      } catch (error) {
        dispatch(createNotification({ type: "error", message: error.message }));
      }
    }
  };

  const suggestionSelected = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
  };

  return (
    <Form onSubmit={handleSearch}>
      <Card>
        <Card.Header>
          <InputGroup>
            <Form.Control
              placeholder="Search sights by area ex. Pirkanmaa"
              onChange={({ target }) => setInput(target.value)}
              value={input}
              name="search-sights"
            />
            <Button
              variant="danger"
              onClick={() => setInput("")}
              aria-labelledby="clear-input-btn-label"
            >
              <span id="clear-input-btn-label" hidden>
                Clear
              </span>
              <BsFillBackspaceFill />
            </Button>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </InputGroup>
          {suggestions.length > 0 && (
            <ListGroup>
              {suggestions.map((suggestion) => {
                return (
                  <ListGroup.Item
                    action
                    onClick={() => suggestionSelected(suggestion)}
                    key={suggestion}
                  >
                    {suggestion}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Card.Header>
      </Card>
    </Form>
  );
};

export default SearchBar;
