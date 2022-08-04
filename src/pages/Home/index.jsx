import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import FilterBar from "../../components/FilterBar";
import SearchBar from "../../components/SearchBar";
import SightCard from "../../components/SightCard/SightCard";

const Home = () => {
  const sights = useSelector((state) => state.sights);

  return (
    <Container className="main-container">
      <h1 hidden>Sights</h1>
      <SearchBar />
      <FilterBar />
      <Row xs={1} sm={1} md={2} xl={3} className="g-4 card-container">
        {sights.map((sight) => {
          return (
            <Col key={sight.id}>
              <SightCard sight={sight} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Home;
