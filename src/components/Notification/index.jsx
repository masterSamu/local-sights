import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Notification from "./Notification";

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);

  return (
    <Container>
      {notifications.map((notification) => {
        return (
          <Notification key={notification.id} notification={notification} />
        );
      })}
    </Container>
  );
};

export default Notifications;
