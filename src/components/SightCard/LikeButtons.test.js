import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
import SightCard from "./SightCard";
import { renderWithProviders, testUser } from "../../utils/test_utils";

const likedUsers = [
  { userId: "123456asdfg", type: "positive" },
  { userId: "qwerty12345", type: "negative" },
];
const sight = {
  name: "kaksi puuta",
  description: "puut halaavat kauniisti",
  imageUrl: "www.google.com",
  category: "nature",
  likes: {
    likedUsers,
    negative: 0,
    positivie: 0,
  },
  userId: "123456asdfg",
};

describe("Sightcard like buttons tests when user is logged in", () => {
  const update = jest.fn();
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    renderWithProviders(<SightCard sight={sight} update={update} />, {
      preloadedState: {
        user: testUser,
        sights: [sight],
      },
    });
  });

  test("Buttons are visible", () => {
    const positiveButton = screen.getByTestId("positive-like");
    expect(positiveButton).toBeInTheDocument();
    const negativeButton = screen.getByTestId("negative-like");
    expect(negativeButton).toBeInTheDocument();
  });
});

describe("Sightcard like buttons tests when user is not logged in", () => {
  const update = jest.fn();
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    renderWithProviders(<SightCard sight={sight} update={update} />, {
      preloadedState: {
        user: null,
        sights: [sight],
      },
    });
  });

  test("Buttons are not visible", () => {
    const positiveButton = screen.queryByTestId("positive-like");
    expect(positiveButton).not.toBeInTheDocument();
    const negativeButton = screen.queryByTestId("negative-like");
    expect(negativeButton).not.toBeInTheDocument();
  });
});
