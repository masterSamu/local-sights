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


describe("FilterBar filter tests", () => {
  test("Clicking 'Has likes' show only sights with likes, and clicking again will show all", () => {
    renderWithProviders(<Home />, {
      preloadedState: {
        user: testUser,
        sights: testSights,
      },
    });

    const firstSight = screen.getByText("Trees");
    expect(firstSight).toBeInTheDocument();

    const showFilterSortButton = screen.getByText("Filter/Sort options");
    userEvent.click(showFilterSortButton);

    const filterByHasLikesButton = screen.getByTestId(
      "filter-button-has-likes"
    );
    userEvent.click(filterByHasLikesButton);

    // Only sights with likes are visible (filter is on)
    const sightCards = screen.queryAllByTestId("sight-card");
    expect(sightCards).toHaveLength(3);
    expect(sightCards[0]).toHaveTextContent(testSights[0].name);
    expect(sightCards[1]).toHaveTextContent(testSights[1].name);
    expect(sightCards[2]).toHaveTextContent(testSights[2].name);

    userEvent.click(filterByHasLikesButton);

    // All sights are visible (filter is off)
    const allSightCards = screen.queryAllByTestId("sight-card");
    expect(allSightCards).toHaveLength(4);
  });
});
