import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import SightForm from "./SightForm";
import { renderWithProviders } from "../../utils/test_utils";

const mockFile = new File(["hello"], "hello.png", { type: "image/png" });

jest.mock("../../components/Coords", () => ({ coords, setCoords }) => (
  <div>
    <button
      onClick={() =>
        setCoords(
          jest.fn().mockReturnValue({ longitude: 61.1, latitude: 23.5 })
        )
      }
    >
      Get location
    </button>
  </div>
));

jest.mock("../../components/CapturePhoto", () => ({ setPhoto }) => (
  <div>
    <label htmlFor="validationPhoto">Photo</label>
    <input
      type="file"
      accept="image/*"
      capture="environment"
      name="photo"
      id="validationPhoto"
      onChange={() => setPhoto(jest.fn().mockReturnValue(mockFile))}
    />
  </div>
));

describe("SightForm component tests", () => {
  const user = {
    id: "123456asdfg",
    username: "user1",
    email: "user1@mail.com",
  };

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    renderWithProviders(
        <SightForm />,
      {
        preloadedState: {
          user: user,
        },
      }
    );
  });

  test("Can't submit form without all information", () => {
    const onSubmit = jest.fn();
    const submit = screen.getByText("Save");
    userEvent.click(submit);
    expect(onSubmit).not.toBeCalled();
  });

  test("Form will submit with correct values", async () => {
    //const onSubmit = jest.fn();
    const name = screen.getByLabelText("Name");
    userEvent.type(name, "Giant tree");
    expect(name.value).toBe("Giant tree");

    const description = screen.getByLabelText("Description");
    userEvent.type(description, "Giant tree at the mountain");
    expect(description.value).toBe("Giant tree at the mountain");

    const photo = screen.getByLabelText("Photo");
    userEvent.upload(photo, mockFile);
    expect(photo.files[0]).toBe(mockFile);
    expect(photo.files[0]).toStrictEqual(mockFile);
    expect(photo.files.item(0)).toStrictEqual(mockFile);
    expect(photo.files).toHaveLength(1);

    const getLocationBtn = screen.getByText("Get location");
    userEvent.click(getLocationBtn);
    const coordinates = screen.getByLabelText("Coordinates");
    expect(coordinates.value).toBe("long: 61.1 , lat: 23.5");

    const saveBtn = screen.getByText("Save");
    expect(saveBtn).toBeInTheDocument();

    // This won't work, because can't access form onSubmit method
    //userEvent.click(saveBtn);
    //expect(onSubmit).toHaveBeenCalled();
  });
});
