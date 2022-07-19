import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../../styles/Bookmarks.css";
import BookmarkCard from "./BookmarkCard";

const Bookmarks = () => {
  const bookmarks = useSelector((state) => state.user.bookmarks);

  return (
    <Container>
      <h1>Bookmarks</h1>
      {bookmarks.length > 0 ? (
        <Row xs={1} md={4} className="g-1 card-container">
          {bookmarks.map((bookmark) => {
            return <BookmarkCard bookmark={bookmark} />;
          })}
        </Row>
      ) : (
        <p>No bookmarks</p>
      )}
    </Container>
  );
};

export default Bookmarks;
