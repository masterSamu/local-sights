import { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSights } from "../../reducers/sightReducer";
import { searchSightsByArea } from "../../services/sights";
import areaData from "../../utils/data/areas_in_finland.json";
import { createNotification } from "../../reducers/notificationReducer";
import { BsFillBackspaceFill } from "react-icons/bs";
import { capitalizeWords } from "../../utils/string_utils";

const SearchBar = () => {
  const sights = useSelector((state) => state.sights);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [sightsWithoutFilter, setsightsWithoutFilter] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (input.trim().length === 0) {
      setSuggestions([]);
    }
    const isInAreas = areaData.areas.includes(input);
    if (input.trim().length > 2 && !isInAreas) {
      setSuggestions(
        areaData.areas.filter((area) =>
          area.includes(capitalizeWords(input.toLowerCase()))
        )
      );
    }
  }, [input]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (input.trim().length > 2) {
      try {
        const newSights = await searchSightsByArea(input.toLowerCase());
        if (sights !== sightsWithoutFilter) {
          setsightsWithoutFilter(sights);
        }
        dispatch(setSights(newSights));
      } catch (error) {
        dispatch(createNotification({ type: "error", message: error.message }));
      }
    } else if (input.trim().length === 0) {
      dispatch(setSights(sightsWithoutFilter));
    }
  };

  const suggestionSelected = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
  };

  return (
    <Form onSubmit={handleSearch}>
      <Card className="searchbar-card">
        <Card.Header>
          <InputGroup>
            <Form.Control
              placeholder="Search sights by area ex. Pirkanmaa"
              onChange={({ target }) => setInput(target.value)}
              value={input}
              name="search-sights"
              aria-labelledby="search-field-label"
            />
            <span id="search-field-label" hidden>Search field for sights</span>
            <Button
              variant="danger"
              onClick={() => setInput("")}
              aria-labelledby="clear-input-btn-label"
            >
              <span id="clear-input-btn-label" hidden>
                Clear text from search
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
