import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import FilterBar from "../../components/FilterBar";
import SightCard from "../../components/SightCard/SightCard";

const Home = () => {
  //const user = useSelector((state) => state.user);
  const sights = useSelector((state) => state.sights);
  return (
    <Container>
      <FilterBar />
      <Row xs={1} md={4} className="g-1 card-container">
        {sights.map((sight) => {
          return (
            <SightCard key={sight.id} sight={sight} />
          );
        })}
      </Row>
    </Container>
  );
};

export default Home;
