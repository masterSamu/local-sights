import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteNotification } from "../../reducers/notificationReducer";
import Heading from "./Heading";

const Notification = ({ notification }) => {
  const dispatch = useDispatch();
  // show state is mandatory for unit tests. App works without, but tests won't.
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    dispatch(deleteNotification(notification.id));
  };

  if (show) {
    return (
      <Alert
        variant={getVariant(notification.type)}
        onClose={handleClose}
        dismissible
      >
        <Alert.Heading>
          <Heading type={notification.type} />
        </Alert.Heading>
        <p>{notification.message}</p>
      </Alert>
    );
  }
};

/**
 * Convert type of notification to variant for Bootstrap styling.
 * @param {"success" | "error" | "warning" | "info"} type string
 */
const getVariant = (type) => {
  switch (type) {
    case "success":
      return "success";
    case "error":
      return "danger";
    case "warning":
      return "warning";
    case "info":
      return "info";
    default:
      return "primary";
  }
};

export default Notification;
