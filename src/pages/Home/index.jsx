import { Container, Row, Col, Button } from "react-bootstrap";
import FilterBar from "../../components/FilterBar";
import SightCard from "../../components/SightCard/SightCard";
import { BsArrowClockwise } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroller";
import useSights from "../../hooks/useSights";

const Home = () => {
  const { sights, allLoaded, getLoadMoreFunction } = useSights();

  return (
    <Container className="main-container">
      <h1 hidden>Sights</h1>
      <FilterBar />
      <InfiniteScroll
        loadMore={getLoadMoreFunction}
        hasMore={!allLoaded}
        loader={<p key={Date.now().toString()}>loading...</p>}
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
      {sights.length === 0 && (
        <Container className="reload-data-button-container">
          <Button variant="light" size="lg">
            Refresh <BsArrowClockwise />
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default Home;
