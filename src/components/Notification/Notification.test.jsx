import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Notification from "./Notification";
import { renderWithProviders } from "../../utils/test_utils";
import {MemoryRouter} from "react-router-dom";

describe("Notification component tests", () => {
  const id = "123asd";
  const type = "success";
  const message = "New user added succesfully";
  const notification = {
    id,
    type,
    message,
  };
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    renderWithProviders(
      <MemoryRouter>
        <Notification notification={notification} />
      </MemoryRouter>,
      {
        preloadedState: {
          notifications: [notification],
        },
      }
    );
  });

  test("Notification and text is visible to user", () => {
    const component = screen.getByRole("alert");
    expect(component).toHaveTextContent(message);
  });

  test("Notification can be closed", () => {
    const component = screen.getByRole("alert");
    const closeButton = screen.getByRole("button");
    userEvent.click(closeButton);
    expect(component).not.toBeInTheDocument();
    //console.log(component);
  });

  /* Move this to full Notification tests
  test("Three notifications are visible to user at same time", () => {
    const notification1 = {id: "123qwe", type: "error", message: "Hello world"};
    const notification2 = {id: "456asd", type: "info", message: "Welcome to the jungle"};
    const notification3 = {id: "789zxc", type: "success", message: "Hi there!"};

    renderWithProviders(<Notification notification={notification} />, {
        preloadedState: {
          notifications: [notification1, notification2, notification3],
        },
      });
  })*/
});
