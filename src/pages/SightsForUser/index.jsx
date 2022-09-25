import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SightCard from "../../components/SightCard/SightCard";
import useSights from "../../hooks/useSights";
import InfiniteScroll from "react-infinite-scroller";

const SightsForUser = () => {
  const username = useParams().username;

  const {
    sights,
    loadSightsUploadedByUser,
    allLoaded,
    loadMoreUploadedByUser,
  } = useSights();

  useEffect(() => {
    loadSightsUploadedByUser(username);
  }, [loadSightsUploadedByUser, username]);

  const loadMore = () => {
    loadMoreUploadedByUser(username);
  };

  return (
    <Container className="main-container">
      <h1>Sights uploaded by @{username}</h1>

      <Row xs={1} sm={1} md={2} xl={3} className="g-4 card-container">
        {sights.length > 0 ? (
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={!allLoaded}
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
                style={{
                  textAlign: "center",
                  padding: "1em",
                  fontSize: "1.2rem",
                }}
              >
                All sights are loaded.
              </p>
            )}
          </InfiniteScroll>
        ) : (
          <p>Looks like @{username} has not uplaoaded any sights yet.</p>
        )}
      </Row>
    </Container>
  );
};
export default SightsForUser;
