import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from "react-icons/bs";
import { addBookmark, removeBookmark } from "../../services/sights";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userReducer";
import { createNotification } from "../../reducers/notificationReducer";

const AddBookMark = ({ sight }) => {
  const user = useSelector((state) => state.user);
  const bookmarks = user.bookmarks;
  const isBookmarked = bookmarks.find(
    (bookmark) => bookmark.sightId === sight.id
  );
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (isBookmarked) {
      const isRemoved = await removeBookmark(user.id, sight);
      if (isRemoved) {
        const newBookmarks = user.bookmarks.filter(
          (bookmark) => bookmark.sightId !== sight.id
        );
        const newUser = { ...user, bookmarks: newBookmarks };
        dispatch(setUser(newUser));
      } else {
        const notification = {
          type: "error",
          message: "Could not remove bookmark.",
        };
        dispatch(createNotification(notification));
      }
    } else {
      const bookmarkObject = await addBookmark(user.id, sight);
      if (bookmarkObject) {
        const newBookmarks = user.bookmarks.concat(bookmarkObject);
        const newUser = { ...user, bookmarks: newBookmarks };
        dispatch(setUser(newUser));
      } else {
        const notification = {
          type: "error",
          message: "Could not add bookmark.",
        };
        dispatch(createNotification(notification));
      }
    }
  };

  if (isBookmarked) {
    return (
      <>
        <BsFillBookmarkDashFill
          onClick={handleClick}
          className="bookmark-icon"
        />
      </>
    );
  } else {
    return (
      <>
        <BsFillBookmarkPlusFill
          onClick={handleClick}
          className="bookmark-icon"
        />
      </>
    );
  }
};

export default AddBookMark;
