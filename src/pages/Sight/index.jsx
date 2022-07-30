import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Image,
  Toast,
  ToastContainer,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import MapboxMap from "../../components/MapboxMap";
import LikeButtons from "../../components/SightCard/LikeButtons";
import { setSight } from "../../reducers/sightReducer";
import AddBookMark from "../../components/AddBookmark";
import "../../styles/Sight.css";

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
    <Container>
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
      <Image fluid src={sight.imageUrl} />
      <article>
        <p>{sight.description}</p>
      </article>
      {user && (
        <>
          <h2>Likes</h2>
          <Row>
            <LikeButtons sight={sight} update={handleUpdate} />
          </Row>
        </>
      )}

      <h2>Location</h2>
      <MapboxMap coords={sight.coords} zoom={10} height="40vh" width="100%" />
      <h2>Comments</h2>
      <ToastContainer>
        {sight.comments.map((comment) => {
          return (
            <Toast key={comment.username}>
              <Toast.Header closeButton={false}>
                <strong className="me-auto">{comment.username}</strong>
              </Toast.Header>
              <Toast.Body>{comment.message}</Toast.Body>
            </Toast>
          );
        })}
      </ToastContainer>
    </Container>
  );
};

export default Sight;
