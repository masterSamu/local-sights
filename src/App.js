import { useEffect } from "react";
import sightService from "./services/sights";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { initializeSights } from "./reducers/sightReducer";
import { Button, Card, CardGroup, Container } from "react-bootstrap";
import "./styles/App.css";
import Login from "./pages/Login";
function App() {
  const dispatch = useDispatch();
  const sights = useSelector((state) => state.sights);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sights = await sightService.getAll();
        if (sights.length > 0) {
          dispatch(initializeSights(sights));
          console.log(sights);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <Container>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
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
      {sights.name}
    </Container>
  );
}

export default App;
