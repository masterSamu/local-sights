import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SightForm from "./SightForm";
import { renderWithProviders } from "../../utils/test_utils";

describe("SightForm component tests", () => {
  const user = {
    id: "123456asdfg",
    username: "user1",
    email: "user1@mail.com",
  };
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    renderWithProviders(<SightForm />, {
      preloadedState: {
        user: user,
      },
    });
  });

  test("Can't submit form without all information", () => {
    const form = screen.getAllByText("required");
    console.log(form.length);
  });
});
