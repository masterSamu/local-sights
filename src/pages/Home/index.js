import { Container, CardGroup, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  const sights = useSelector((state) => state.sights);
  return (
    <Container>
      {user && <h3>{user?.username} logged in</h3>}
      <CardGroup>
        {sights.map((sight) => {
          return (
            <Card key={sight.id} className="sight-card">
              <Card.Img variant="top" src={sight.imageUrl} />
              <Card.Body>
                <Card.Title>{sight.name}</Card.Title>
                <Card.Subtitle>{sight.category}</Card.Subtitle>
                <Card.Text>{sight.description}</Card.Text>
                <Button>Open Map</Button>
              </Card.Body>
              <Card.Footer>Uploaded by @{sight.userId}</Card.Footer>
            </Card>
          );
        })}
      </CardGroup>
    </Container>
  );
};

export default Home;
