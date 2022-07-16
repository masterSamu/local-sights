import { BsFillBookmarkFill } from "react-icons/bs";

const Bookmarked = ({ sightId, user }) => {
  if (user) {
    const bookmarks = user.bookmarks;
    const isBookmarked = bookmarks.find(
      (bookmark) => bookmark.sightId === sightId
    );
    
    if (isBookmarked) {
      return <BsFillBookmarkFill className="is-bookmarked-card-icon" />;
    }
  }
};

export default Bookmarked;
