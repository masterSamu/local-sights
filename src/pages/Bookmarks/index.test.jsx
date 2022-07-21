import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test_utils";
import "@testing-library/jest-dom/extend-expect";
import Bookmarks from "./index";

const bookmarks = [
  {
    name: "bookmark1",
    sightId: "123asd",
    imageUrl: "",
  },
  {
    name: "bookmark2",
    sightId: "123asd12",
    imageUrl: "",
  },
  {
    name: "bookmark3",
    sightId: "123asd34",
    imageUrl: "",
  },
];

const user = {
  id: "123456asdfg",
  username: "user1",
  email: "user1@mail.com",
  bookmarks,
};

describe("Bookmarks page tests", () => {
  test("If there is zero bookmarks, render feedback text", () => {
    const newUser = { ...user, bookmarks: [] };
    renderWithProviders(<Bookmarks />, {
      preloadedState: {
        user: newUser,
      },
    });

    const feedback = screen.getByText("No bookmarks");
    expect(feedback).toBeInTheDocument();
  });
  test("Three bookmarks are visible", () => {
    renderWithProviders(<Bookmarks />, {
      preloadedState: {
        user: user,
      },
    });

    const bookmark1 = screen.getByText(bookmarks[0].name);
    expect(bookmark1).toBeInTheDocument();
    const bookmark2 = screen.getByText(bookmarks[1].name);
    expect(bookmark2).toBeInTheDocument();
    const bookmark3 = screen.getByText(bookmarks[2].name);
    expect(bookmark3).toBeInTheDocument();
  });
});
