import { screen, re } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test_utils";
import "@testing-library/jest-dom/extend-expect";
import Heading from ".";

describe("Notification heading tests", () => {
  test("Success text is rendering when type is success", () => {
    renderWithProviders(<Heading type="success" />, {
      preloadedState: {
        notifications: [{
          id: "123asd",
          type: "success",
          message: "Hello world",
        }],
      },
    });

    const component = screen.getByText("Success");
    expect(component).toBeInTheDocument();
  });
});
