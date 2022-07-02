import { Container, CardGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import SightCard from "../../components/SightCard/SightCard";

const Home = () => {
  const user = useSelector((state) => state.user);
  const sights = useSelector((state) => state.sights);
  return (
    <Container>
      {user && <h3>{user?.username} logged in</h3>}
      <CardGroup>
        {sights.map((sight) => {
          return (
            <SightCard key={sight.id} sight={sight} />
          );
        })}
      </CardGroup>
    </Container>
  );
};

export default Home;
