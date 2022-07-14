import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Notifications from ".";
import { renderWithProviders } from "../../utils/test_utils";

describe("Notifications container tests", () => {
  beforeEach(() => {
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
    // eslint-disable-next-line testing-library/no-render-in-setup
    renderWithProviders(
      <MemoryRouter>
        <Notifications />
      </MemoryRouter>,
      {
        preloadedState: {
          notifications: [notification1, notification2, notification3],
        },
      }
    );
  });
  test("Three notifications are visible to user at same time", () => {
    const notifications = screen.getAllByRole("alert");
    expect(notifications).toHaveLength(3);
    
  });
});
