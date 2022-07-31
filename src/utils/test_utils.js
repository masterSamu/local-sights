import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import userReducer from "../reducers/userReducer";
import sightReducer from "../reducers/sightReducer";
import notificationReducer from "../reducers/notificationReducer";

/**
 * Render component wrapped to reducer Provider, and MemoryRouter
 */
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        user: userReducer,
        sights: sightReducer,
        notifications: notificationReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const testUser = {
  id: "123456asdfg",
  username: "user1",
  email: "user1@mail.com",
  bookmarks: [{ sightId: "456qwe", name: "Hills", imageUrl: "" }],
};

export const testSights = [
  {
    name: "Trees",
    id: "123asd",
    description: "Nice trees",
    imageUrl: "",
    likes: {
      likedUsers: [{ type: "positive", userId: "user1234" }],
      negative: 0,
      positive: 1,
    },
    coords: { latitude: 61.0, longitude: 23.0 },
    user: {
      id: "user6789",
      username: "user6789"
    },
    comments: [],
    location: {
      city: "nokia",
      area: "pirkanmaa",
      country: "finland"
    }
  },
  {
    name: "Rocks",
    id: "789zxc",
    description: "Nice rocks",
    imageUrl: "",
    likes: {
      likedUsers: [
        { type: "positive", userId: "123456asdfg" },
        { type: "positive", userId: "userqwerty123" },
        { type: "negative", userId: "qwertyuser12" },
      ],
      negative: 1,
      positive: 2,
    },
    coords: { latitude: 61.0, longitude: 23.0 },
    user: {
      id: "user6789",
      username: "user6789"
    },
    comments: [],
    location: {
      city: "nokia",
      area: "pirkanmaa",
      country: "finland"
    }
  },
  {
    name: "Hills",
    id: "456qwe",
    description: "Nice hills",
    imageUrl: "",
    likes: {
      likedUsers: [
        { type: "negative", userId: "user1234" },
        { type: "negative", userId: "userqwerty123" },
        { type: "negative", userId: "qwertyuser12" },
        { type: "negative", userId: "qwertyuser1254" },
      ],
      negative: 4,
      positive: 0,
    },
    coords: { latitude: 61.0, longitude: 23.0 },
    user: {
      id: "user6789",
      username: "user6789"
    },
    comments: [],
    location: {
      city: "nokia",
      area: "pirkanmaa",
      country: "finland"
    }
  },
  {
    name: "Mountain",
    id: "mou890",
    description: "High mountain",
    imageUrl: "",
    likes: {
      likedUsers: [],
      negative: 0,
      positive: 0,
    },
    coords: { latitude: 61.0, longitude: 23.0 },
    user: {
      id: "user6789",
      username: "user6789"
    },
    comments: [],
    location: {
      city: "nokia",
      area: "pirkanmaa",
      country: "finland"
    }
  },
];
