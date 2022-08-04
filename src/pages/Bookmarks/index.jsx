import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../../styles/Bookmarks.css";
import BookmarkCard from "./BookmarkCard";

const Bookmarks = () => {
  const bookmarks = useSelector((state) => state.user.bookmarks);

  if (bookmarks) {
    return (
      <Container className="main-container">
        <h1>Bookmarks</h1>
        {bookmarks.length > 0 ? (
          <Row xs={1} sm={1} md={2} xl={3} className="g-4 card-container">
            {bookmarks.map((bookmark) => {
              return (
                <Col key={bookmark.sightId}>
                  <BookmarkCard bookmark={bookmark} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <p>No bookmarks</p>
        )}
      </Container>
    );
  }
};

export default Bookmarks;
