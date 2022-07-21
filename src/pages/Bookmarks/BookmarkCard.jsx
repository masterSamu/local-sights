import { Button, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddBookMark from "../../components/AddBookmark";

const BookmarkCard = ({ bookmark }) => {
  return (
    <Card className="bookmark-card">
      <Card.Img src={bookmark.imageUrl} alt="bookmark image" />
      <AddBookMark
        sight={{
          id: bookmark.sightId,
          name: bookmark.name,
          imageUrl: bookmark.imageUrl,
        }}
        position="top-right"
      />
      <Card.Body>
        <Row>
          <Card.Title>{bookmark.name} </Card.Title>
        </Row>
        <Row className="button-row">
          <Button as={Link} to={`/sight/${bookmark.sightId}`}>
            More
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BookmarkCard;
