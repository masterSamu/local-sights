import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../../components/FilterBar";
import SearchBar from "../../components/SearchBar";
import SightCard from "../../components/SightCard/SightCard";
import { setSights } from "../../reducers/sightReducer";
import { BsArrowClockwise } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroller";
import { useEffect } from "react";
import useSights from "../../hooks/useSights";
import LoaderSpinner from "../../components/LoaderSpinner";
import { uuidv4 } from "@firebase/util";

const Home = () => {
  const sights = useSelector((state) => state.sights);
  const dispatch = useDispatch();

  const { data, error, isLoading, allLoaded, loadMore } = useSights();

  useEffect(() => {
    dispatch(setSights(data));
  }, [data, dispatch]);

  return (
    <Container className="main-container">
      <h1 hidden>Sights</h1>
      <SearchBar />
      <FilterBar />
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={!allLoaded}
        loader={<LoaderSpinner key={uuidv4()} isLoading={isLoading} />}
      >
        <Row xs={1} sm={1} md={2} xl={3} className="g-4 card-container">
          {sights.map((sight) => {
            return (
              <Col key={sight.id}>
                <SightCard sight={sight} />
              </Col>
            );
          })}
        </Row>
        {allLoaded && (
          <p
            style={{ textAlign: "center", padding: "1em", fontSize: "1.2rem" }}
          >
            All sights are loaded.
          </p>
        )}
      </InfiniteScroll>
      {error && (
        <Container>
          <Alert variant="danger">
            {error.content}
          </Alert>
        </Container>
      )}
      {sights.length === 0 && (
        <Container className="reload-data-button-container">
          <Button variant="light" onClick={loadMore} size="lg">
            Refresh <BsArrowClockwise />
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default Home;
