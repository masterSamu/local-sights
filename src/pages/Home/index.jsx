import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import FilterBar from "../../components/FilterBar";
import SearchBar from "../../components/SearchBar";
import SightCard from "../../components/SightCard/SightCard";

const Home = () => {
  const sights = useSelector((state) => state.sights);

  return (
    <Container className="main-container">
      <SearchBar />
      <FilterBar />
      <Row xs={1} md={4} className="g-1 card-container">
        {sights.map((sight) => {
          return <SightCard key={sight.id} sight={sight} />;
        })}
      </Row>
    </Container>
  );
};

export default Home;
