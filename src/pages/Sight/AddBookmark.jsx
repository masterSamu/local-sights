import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from "react-icons/bs";
import { addBookmark, getBookmarks } from "../../services/sights";
import { useState, useEffect } from "react";

const AddBookMark = ({ userId, sight }) => {
  const [isBookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const bookmark = await getBookmarks(userId, sight?.id);
      if (bookmark) {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    };
    fetch();
  }, [userId, sight, isBookmarked]);

  const handleClick = async () => {
    if (isBookmarked) {
      // remove bookmark from db
    } else {
      const isAdded = await addBookmark(userId, sight);
    }
    setBookmarked(!isBookmarked);
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
