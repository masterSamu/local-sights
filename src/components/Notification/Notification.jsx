import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteNotification } from "../../reducers/notificationReducer";

const Notification = ({ notification }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(deleteNotification(notification.id));
  };

  return (
    <Alert
      key={notification.id}
      variant={getVariant(notification.type)}
      onClose={handleClose}
      dismissible
    >
      <p>{notification.message}</p>
    </Alert>
  );
};

/**
 * Convert type of notification to wanted variant for Bootstrap styling.
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
