import { useEffect } from "react";
import userService, {
  extractUserProperties,
  getUserInfo,
} from "./services/user";
import { useDispatch,  } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddSight from "./pages/AddSight";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "./reducers/userReducer";
import Sight from "./pages/Sight";
import Navigationbar from "./components/Navbar/Navigationbar";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateAccount from "./pages/CreateAccount";
import Notifications from "./components/Notification";
import Bookmarks from "./pages/Bookmarks";
import SightsFromUser from "./pages/SightsForUser";
import { setNotifications } from "./reducers/notificationReducer";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookieConsent from "./components/CookieConsent";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userInfo = await getUserInfo(currentUser.uid);
          const loggedUser = extractUserProperties(currentUser, userInfo);
          dispatch(setUser(loggedUser));
        } else {
          dispatch(setUser(null));
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);

  /**
   * Log out user from system
   */
  const logOut = () => {
    const loggedOut = userService.logOut();
    if (loggedOut) {
      localStorage.removeItem("user");
      dispatch(setUser(null));
      dispatch(setNotifications([]));
    }
  };

  return (
    <>
      <Navigationbar logOut={logOut} />
      <main>
        <CookieConsent />
        <Notifications />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route
            path="/sight/add"
            element={
              <ProtectedRoute>
                <AddSight />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />
          <Route path="/sight/:id" element={<Sight />} />
          <Route path="/sights/:username" element={<SightsFromUser />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
