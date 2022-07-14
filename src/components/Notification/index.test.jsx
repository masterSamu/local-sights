import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Notifications from ".";
import { renderWithProviders } from "../../utils/test_utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

describe("Notifications container tests", () => {
  const notification1 = {
    id: "123qwe",
    type: "error",
    message: "Hello world",
  };
  const notification2 = {
    id: "456asd",
    type: "info",
    message: "Welcome to the jungle",
  };
  const notification3 = {
    id: "789zxc",
    type: "success",
    message: "Hi there!",
  };
  const notifications = [notification1, notification2, notification3];

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    renderWithProviders(
      <MemoryRouter>
        <Notifications />
      </MemoryRouter>,
      {
        preloadedState: {
          notifications: notifications,
        },
      }
    );
  });
  test("Three notifications are visible to user at same time", () => {
    const notifications = screen.getAllByRole("alert");
    expect(notifications).toHaveLength(3);
  });

  test("Dismiss one notification still leaves 2 notifications open", () => {
    // eslint-disable-next-line testing-library/no-debugging-utils
    let notifications = screen.getAllByRole("alert");
    expect(notifications).toHaveLength(3);
    const [firstButton, secondButton, thirdButton] =
      screen.getAllByRole("button");
    userEvent.click(firstButton); // Dismiss first item
    notifications = screen.getAllByRole("alert");
    expect(notifications).toHaveLength(2);
    expect(notifications[0]).toHaveTextContent(notification2.message);
    expect(notifications[1]).toHaveTextContent(notification3.message);
  });
});
