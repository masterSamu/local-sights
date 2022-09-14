import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../../components/FilterBar";
import SearchBar from "../../components/SearchBar";
import SightCard from "../../components/SightCard/SightCard";
import { getFirstSights, getNextSights } from "../../services/sights";

import { setSights } from "../../reducers/sightReducer";
import { createNotification } from "../../reducers/notificationReducer";
import { BsArrowClockwise } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroller";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const sights = useSelector((state) => state.sights);
  const [lastValue, setLastValue] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const dispatch = useDispatch();
  const maxCountOfSightsPerFetch = 30;

  useEffect(() => {
    let fetched = false;
    if (!fetched) {
      getFirstSights(maxCountOfSightsPerFetch)
        .then((documentSnapshots) => {
          const newSights = [];
          documentSnapshots.forEach((doc) => {
            newSights.push({ ...doc.data(), id: doc.id });
          });
          dispatch(setSights(newSights));
          if (newSights.length === maxCountOfSightsPerFetch) {
            setLastValue(
              documentSnapshots.docs[documentSnapshots.docs.length - 1]
            );
            setAllLoaded(false);
          } else {
            setLastValue(null);
            setAllLoaded(true);
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            createNotification({
              id: `fetch-error-${Date.now().toString()}`,
              type: "error",
              message: error.message,
            })
          );
        })
        .finally(() => {
          fetched = true;
        });
    }
  }, [dispatch]);

  const loadMoreSights = async () => {
    const documentSnapshots = await getNextSights(
      maxCountOfSightsPerFetch,
      lastValue
    );

    const newSights = [];
    documentSnapshots.forEach((doc) => {
      newSights.push({ ...doc.data(), id: doc.id });
    });
    dispatch(setSights([...sights, ...newSights]));
    if (newSights.length === maxCountOfSightsPerFetch) {
      setLastValue(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      setAllLoaded(false);
    } else {
      setLastValue(null);
      setAllLoaded(true);
    }
  };

  return (
    <Container className="main-container">
      <h1 hidden>Sights</h1>
      <SearchBar />
      <FilterBar />
      <InfiniteScroll
        loadMore={loadMoreSights}
        hasMore={lastValue !== null}
        loader={<p key={Date.now().toString()}>loading...</p>}
      >
        <Row xs={1} sm={1} md={2} xl={3} className="g-4 card-container">
          {sights.map((sight) => {
            return (
              <Col key={sight.id}>
                <SightCard sight={sight} />
              </Col>
            );
          })}
        </Row>
        {allLoaded && (
          <p
            style={{ textAlign: "center", padding: "1em", fontSize: "1.2rem" }}
          >
            All sights are loaded.
          </p>
        )}
      </InfiniteScroll>
      {sights.length === 0 && (
        <Container className="reload-data-button-container">
          <Button variant="light" onClick={loadMoreSights} size="lg">
            Refresh <BsArrowClockwise />
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default Home;
