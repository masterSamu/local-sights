import { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";

const OfflineBadge = () => {
  const [isOffline, setOffline] = useState(!navigator.onLine);

  const setOfflineStatus = () => {
    setOffline(!navigator.onLine);
  };

  useEffect(() => {
    if (isOffline) {
      window.addEventListener("online", setOfflineStatus);
      window.removeEventListener("offline", setOfflineStatus);
    } else {
      window.addEventListener("offline", setOfflineStatus);
      window.removeEventListener("online", setOfflineStatus);
    }
  }, [isOffline]);

  if (isOffline) {
    return (
      <Badge pill bg="warning" text="dark">
        Offline
      </Badge>
    );
  }
};
export default OfflineBadge;
