import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  renderWithProviders,
  testUser,
  testSights,
} from "../../utils/test_utils";
import Home from "../../pages/Home";

describe("FilterBar sort tests", () => {
  test("Clicking thumbs up button order sights based on positive likes", () => {
    renderWithProviders(<Home />, {
      preloadedState: {
        user: testUser,
        sights: testSights,
      },
    });

    const firstSight = screen.getByText("Trees");
    expect(firstSight).toBeInTheDocument();

    const showFilterSortButton = screen.getByText("Filter/Sort");
    userEvent.click(showFilterSortButton);

    const sortByThumsUpButton = screen.getByTestId("sort-button-thumbs-up");
    userEvent.click(sortByThumsUpButton);

    const sightCards = screen.queryAllByTestId("sight-card");
    expect(sightCards).toHaveLength(4);

    expect(sightCards[0]).toHaveTextContent(testSights[1].name);
    expect(sightCards[1]).toHaveTextContent(testSights[0].name);
    expect(sightCards[2]).toHaveTextContent(testSights[2].name);
    expect(sightCards[3]).toHaveTextContent(testSights[3].name);
  });

  test("Clicking thumbs down button order sights based on negative likes", () => {
    renderWithProviders(<Home />, {
      preloadedState: {
        user: testUser,
        sights: testSights,
      },
    });

    const firstSight = screen.getByText("Trees");
    expect(firstSight).toBeInTheDocument();

    const showFilterSortButton = screen.getByText("Filter/Sort");
    userEvent.click(showFilterSortButton);

    const sortByThumsDownButton = screen.getByTestId("sort-button-thumbs-down");
    userEvent.click(sortByThumsDownButton);

    const sightCards = screen.queryAllByTestId("sight-card");
    expect(sightCards).toHaveLength(4);

    expect(sightCards[0]).toHaveTextContent(testSights[2].name);
    expect(sightCards[1]).toHaveTextContent(testSights[1].name);
    expect(sightCards[2]).toHaveTextContent(testSights[0].name);
    expect(sightCards[3]).toHaveTextContent(testSights[3].name);
  });

  test("Clicking 'Total votes' button order sights based on total vote count", () => {
    renderWithProviders(<Home />, {
      preloadedState: {
        user: testUser,
        sights: testSights,
      },
    });

    const firstSight = screen.getByText("Trees");
    expect(firstSight).toBeInTheDocument();

    const showFilterSortButton = screen.getByText("Filter/Sort");
    userEvent.click(showFilterSortButton);

    const sortByTotalLikesButton = screen.getByTestId(
      "sort-button-total-likes"
    );
    userEvent.click(sortByTotalLikesButton);

    const sightCards = screen.queryAllByTestId("sight-card");
    expect(sightCards).toHaveLength(4);

    expect(sightCards[0]).toHaveTextContent(testSights[2].name);
    expect(sightCards[1]).toHaveTextContent(testSights[1].name);
    expect(sightCards[2]).toHaveTextContent(testSights[0].name);
    expect(sightCards[3]).toHaveTextContent(testSights[3].name);
  });
});

describe("FilterBar filter tests", () => {
  test("Clicking 'Has likes' show only sights with likes", () => {
    renderWithProviders(<Home />, {
      preloadedState: {
        user: testUser,
        sights: testSights,
      },
    });

    const firstSight = screen.getByText("Trees");
    expect(firstSight).toBeInTheDocument();

    const showFilterSortButton = screen.getByText("Filter/Sort");
    userEvent.click(showFilterSortButton);

    const filterByHasLikesButton = screen.getByTestId(
      "filter-button-has-likes"
    );
    userEvent.click(filterByHasLikesButton);

    const sightCards = screen.queryAllByTestId("sight-card");
    expect(sightCards).toHaveLength(3);

    expect(sightCards[0]).toHaveTextContent(testSights[0].name);
    expect(sightCards[1]).toHaveTextContent(testSights[1].name);
    expect(sightCards[2]).toHaveTextContent(testSights[2].name);
  });
});
