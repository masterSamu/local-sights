import { useSelector, useDispatch } from "react-redux";
import { Container, Image, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import MapboxMap from "../../components/MapboxMap";
import LikeButtons from "../../components/SightCard/LikeButtons";
import { setSight } from "../../reducers/sightReducer";
import AddBookMark from "../../components/AddBookmark";
import "../../styles/Sight.css";
import { capitalizeWords } from "../../utils/string_utils";

const Sight = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.user);
  const sight = useSelector((state) =>
    state.sights.find((sight) => sight.id === id)
  );

  const dispatch = useDispatch();

  const handleUpdate = (newSight) => {
    dispatch(setSight(newSight));
  };

  if (!sight)
    return (
      <p>
        No sight found with id: <i>{id}</i>
      </p>
    );

  return (
    <Container className="main-container sight-page-container">
      <Row className="sight-info-row">
        <Col className="sight-info-container">
          <Row>
            <Col>
              <h1>
                {sight.name}{" "}
                {user && <AddBookMark userId={user.id} sight={sight} />}
              </h1>
              Uploaded by{" "}
              <Link to={`/sights/${sight.user.username}`}>
                @{sight.user.username}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <article>
                <h2>Description</h2>
                <p>{sight.description}</p>
              </article>
            </Col>
          </Row>
          {user && (
            <Row>
              <h2>Like</h2>
              <Row>
                <LikeButtons sight={sight} update={handleUpdate} />
              </Row>
            </Row>
          )}
        </Col>
        <Col>
          <Image fluid rounded src={sight.imageUrl} alt={sight.description} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Location</h2>
          <p>
            {capitalizeWords(sight.location.city)},{" "}
            {capitalizeWords(sight.location.area)},{" "}
            {capitalizeWords(sight.location.country)}
          </p>

        </Col>
      </Row>
          <MapboxMap
            coords={sight.coords}
            zoom={10}
            height="40vh"
            width="100%"
          />
    </Container>
  );
};

export default Sight;
