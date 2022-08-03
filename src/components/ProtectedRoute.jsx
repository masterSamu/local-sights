import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("user");
  const user = useSelector((state) => state.user);
  
  if (user) {
    return children;
  } else {
    if (isLoggedIn !== "ok") {
      return <Navigate to="/" replace />;
    }
  }
};

export default ProtectedRoute;
