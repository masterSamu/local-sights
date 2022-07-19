import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddBookMark from "../../components/AddBookmark";

const BookmarkCard = ({ bookmark }) => {
  return (
    <Card className="bookmark-card">
      <Card.Header>
        {bookmark.name}{" "}
        <AddBookMark
          sight={{
            id: bookmark.sightId,
            name: bookmark.name,
            imageUrl: bookmark.imageUrl,
          }}
        />
      </Card.Header>
      <Card.Img src={bookmark.imageUrl} alt="bookmark image" />
      <Card.Body>
        <Button as={Link} to={`/sight/${bookmark.sightId}`}>
          More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookmarkCard;
