import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test_utils";
import "@testing-library/jest-dom/extend-expect";
import Heading from ".";

describe("Notification heading tests", () => {
  test("Success text is rendering when type is success", () => {
    renderWithProviders(<Heading type="success" />, {
      preloadedState: {
        notifications: [
          {
            id: "123asd",
            type: "success",
            message: "Hello world",
          },
        ],
      },
    });

    const component = screen.getByText("Success");
    expect(component).toBeInTheDocument();
  });

  test("Error text is rendering when type is error", () => {
    renderWithProviders(<Heading type="error" />, {
      preloadedState: {
        notifications: [
          {
            id: "123asd",
            type: "error",
            message: "Hello world",
          },
        ],
      },
    });

    const component = screen.getByText("Error");
    expect(component).toBeInTheDocument();
  });

  test("Warning text is rendering when type is warning", () => {
    renderWithProviders(<Heading type="warning" />, {
      preloadedState: {
        notifications: [
          {
            id: "123asd",
            type: "warning",
            message: "Hello world",
          },
        ],
      },
    });

    const component = screen.getByText("Warning");
    expect(component).toBeInTheDocument();
  });

  test("Info text is rendering when type is info", () => {
    renderWithProviders(<Heading type="info" />, {
      preloadedState: {
        notifications: [
          {
            id: "123asd",
            type: "info",
            message: "Hello world",
          },
        ],
      },
    });

    const component = screen.getByText("Info");
    expect(component).toBeInTheDocument();
  });
});
