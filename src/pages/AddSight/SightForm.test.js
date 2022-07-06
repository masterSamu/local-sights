import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SightForm from "./SightForm";
import { renderWithProviders } from "../../utils/test_utils";
import { MemoryRouter } from "react-router-dom";

describe("SightForm component tests", () => {
  const user = {
    id: "123456asdfg",
    username: "user1",
    email: "user1@mail.com",
  };

  jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    GeolocateControl: jest.fn(),
    Map: jest.fn(() => ({
      addControl: jest.fn(),
      on: jest.fn(),
      remove: jest.fn(),
    })),
    NavigationControl: jest.fn(),
  }));

  
  beforeEach(() => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      renderWithProviders(
          <MemoryRouter>
        <SightForm />
      </MemoryRouter>,
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

  test("Feedback is visible to user", async () => {
    const onSubmit = jest.fn();
    const name = screen.getByLabelText("Name");
    userEvent.type(name, "Giant tree");
    expect(name.value).toBe("Giant tree");
    
    const description = screen.getByLabelText("Description");
    userEvent.type(description, "Giant tree at the mountain");
    expect(description.value).toBe("Giant tree at the mountain");
    
    const fakeFile = new File(["hello"], "hello.png", { type: "image/png" });
    const photo = screen.getByLabelText("Photo");
    userEvent.upload(photo, fakeFile);
    expect(photo.files[0]).toBe(fakeFile);

    const mockGeolocation = {
        watchPosition: jest.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              longitude: 61.1,
              latitude: 23.5,
            },
        })
        )
        ),
    };
    global.navigator.geolocation = mockGeolocation;
    
    
    
    jest.mock("../../components/Coords", () => ({
        __esModule: true,
        Coords: jest.fn(() => {
            <div />
        })
    }));
    const getLocationBtn = screen.getByText("Get location");
    userEvent.click(getLocationBtn);
    const coordinates = screen.getByLabelText("Coordinates");
    expect(coordinates.value).toBe("45.3, 51.1");
  });
});
