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
      <Row xs={1} md={3} className="g-1 card-container">
        {sights.map((sight) => {
          return (
            <Col>
              <SightCard key={sight.id} sight={sight} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Home;
