import { expect } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import coverLetterReducer from "../slices/coverLetterSlice";
import loaderReducer from "../slices/loaderSlice";
import SideBar from "../components/SideBar";
import { screen } from "@testing-library/react";

// creating a mock store using the same reducers from your actual store
const mockStore = configureStore({
  reducer: {
    user: userReducer,
    cover: coverLetterReducer,
    loader: loaderReducer,
  },
});
// first test -  option A with document:
test("only one hamburger button is visible at any given time (syntax A)", () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>
    </Provider>
  );

  const hamburgerButtons = document.querySelectorAll(".hamburger");
  expect(hamburgerButtons).toHaveLength(1);
});

// first test -  option B with screen:
test("only one hamburger button is visible at any given time (syntax B)", () => {
  const { container } = render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>
    </Provider>
  );

  const hamburgerButtons = container.querySelectorAll(".hamburger");
  expect(hamburgerButtons).toHaveLength(1);
});

test("username text input should render when sidebar is visible", async () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>
    </Provider>
  );

  // clicking the hamburger button makes the sidebar visible
  const hamburgerButtons = document.querySelectorAll(".hamburger");

  fireEvent.click(hamburgerButtons[0]);

  // when the sidebar is visible, i can see the input
  const textInput = screen.getByTestId("username-input");

  expect(textInput).toBeInTheDocument();
});

test("loader displays after form submission and dissapear afterwards", async () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>
    </Provider>
  );
  // open the sidebar
  const hamburgerButtons = document.querySelectorAll(".hamburger");

  fireEvent.click(hamburgerButtons[0]);

  // insert values into the fields
  const usernameInput = screen.getByTestId("username-input");
  fireEvent.change(usernameInput, { target: { value: "testuser" } });

  const passwordInput = screen.getByTestId("password-input");
  fireEvent.change(passwordInput, { target: { value: "password" } });

  // clicking login
  const loginBtn = screen.getByTestId("login-btn");
  fireEvent.click(loginBtn);

  // alternatively pressing enter
  // fireEvent.keyPress(usernameInput, { key: "Enter", code: 13 });

  // waiting for the loader to appear
  const loader = document.querySelectorAll(".loader");
  await waitFor(() => {
    expect(loader[0]).toBeInTheDocument;
  });

  // waiting for the loader to disappear
  await waitFor(() => {
    expect(loader[0]).not.toBeInTheDocument;
  });
});
