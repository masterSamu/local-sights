import userService from "./services/user";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./styles/App.css";
import { setUser } from "./reducers/userReducer";
import Navigationbar from "./components/Navbar/Navigationbar";
import Notifications from "./components/Notification";
import { setNotifications } from "./reducers/notificationReducer";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

function App() {
  const dispatch = useDispatch();

  /**
   * Log out user from system
   */
  const logOut = () => {
    userService
      .logOut()
      .then(() => {
        localStorage.removeItem("user");
        dispatch(setUser(null));
        dispatch(setNotifications([]));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Navigationbar logOut={logOut} />
      <CookieConsent />
      <Notifications />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
