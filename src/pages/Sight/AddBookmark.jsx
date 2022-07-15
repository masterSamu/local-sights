import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from "react-icons/bs";
import { addBookmark, removeBookmark } from "../../services/sights";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userReducer";

const AddBookMark = ({ sight }) => {
  const user = useSelector((state) => state.user);
  const isBookmarked = user.bookmarks.find(
    (bookmark) => bookmark.sightId === sight.id
  );
  const dispatch = useDispatch();
  console.log("user", user);

  const handleClick = async () => {
    if (isBookmarked) {
      const isRemoved = await removeBookmark(user.id, sight);
      const newBookmarks = user.bookmarks.filter(
        (bookmark) => bookmark.sightId !== sight.id
      );
      const newUser = { ...user, bookmarks: newBookmarks };
      console.log("new:", newUser);
      dispatch(setUser(newUser));
      console.log(isRemoved);
    } else {
      const bookmarkObject = await addBookmark(user.id, sight);
      const newBookmarks = user.bookmarks.concat(bookmarkObject);
      console.log("bookmarks", newBookmarks);
      const newUser = { ...user, bookmarks: newBookmarks };

      console.log("newuser:", newUser);
      dispatch(setUser(newUser));
      console.log(bookmarkObject);
      console.log(newUser);
    }
  };

  if (isBookmarked) {
    return (
      <>
        <BsFillBookmarkDashFill onClick={handleClick} />
      </>
    );
  } else {
    return (
      <>
        <BsFillBookmarkPlusFill onClick={handleClick} />
      </>
    );
  }
};

export default AddBookMark;
