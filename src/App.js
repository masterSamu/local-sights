import { useEffect } from "react";
import sightService from "./services/sights";
import userService, { extractUserProperties } from "./services/user";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { initializeSights } from "./reducers/sightReducer";
import { Container } from "react-bootstrap";
import "./styles/App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "./reducers/userReducer";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sights = await sightService.getAll();
        if (sights.length > 0) {
          dispatch(initializeSights(sights));
          console.log(sights);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          const loggedUser = extractUserProperties(currentUser);
          dispatch(setUser(loggedUser));
        } else {
          dispatch(setUser(null));
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);

  const logOut = () => {
    const loggedOut = userService.logOut();
    if (loggedOut) {
      dispatch(setUser(null));
    } else {
      console.log("Could not log out");
    }
  };

  console.log("main", user);

  return (
    <Container>
      {user && <button onClick={logOut}>Log out</button>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Container>
  );
}

export default App;
