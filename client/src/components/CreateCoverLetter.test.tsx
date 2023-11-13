import { expect } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import coverLetterReducer from "../slices/coverLetterSlice";
import loaderReducer from "../slices/loaderSlice";
import CreateCoverLetter from "../components/CreateCoverLetter";
import { screen } from "@testing-library/react";

// in the componenet afer clicking submit, if we get a letter there is a function
// that scroll down to the letter, the following line prevent this functionality
// to effect on this test "displaying a letter after filling out the form and click submit"
window.HTMLElement.prototype.scrollIntoView = function () {};

// creating a mock store using the same reducers from your actual store (here it take the inital state that i set in the slices files)
const mockStore = configureStore({
  reducer: {
    user: userReducer,
    cover: coverLetterReducer,
    loader: loaderReducer,
  },
});

test("only one hamburger button is visible at any given time", () => {
  const { container } = render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <CreateCoverLetter />
      </MemoryRouter>
    </Provider>
  );

  const hamburgerButtons = container.querySelectorAll(".hamburger");
  expect(hamburgerButtons).toHaveLength(0);
});

test("two text inputs render", () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <CreateCoverLetter />
      </MemoryRouter>
    </Provider>
  );
  const textInputs = document.getElementsByTagName("input");
  expect(textInputs).toHaveLength(2);
});

test("one textArea renders", () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <CreateCoverLetter />
      </MemoryRouter>
    </Provider>
  );
  const textArea = document.getElementsByTagName("textarea");
  expect(textArea).toHaveLength(1);
});

test("one button renders", () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <CreateCoverLetter />
      </MemoryRouter>
    </Provider>
  );
  const submitButton = screen.getAllByRole("button");
  expect(submitButton).toHaveLength(1);
});

test("we should not see a cover letter when initially rendered", () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <CreateCoverLetter />
      </MemoryRouter>
    </Provider>
  );
  const letterContainer = screen.queryByTestId("letterContainer");
  expect(letterContainer).not.toBeInTheDocument();
});

// i had to create new mocks for the next test:
const fakeUser = {
  user_id: 1,
  username: "fakeUser",
  email: "fakeuser@example.com",
  first_name: "Fake",
  last_name: "User",
  tech_info: "Some tech info",
  personal_info: {},
  personal_text: "Some personal text",
  img: "path/to/fake/image.jpg",
};
// const initialLoaderState = {
//   loading: false,
// };
// const initialCoverLetterState = {
//   letters: [],
// };

const mockStore2 = configureStore({
  reducer: {
    user: userReducer,
    cover: coverLetterReducer,
    loader: loaderReducer,
  },
  preloadedState: {
    user: {
      user: fakeUser,
      isAuthenticated: true,
    },
    // cover: initialCoverLetterState,
    // loader: initialLoaderState,
  },
});

test("displaying a letter after filling out the form and click submit", async () => {
  render(
    <Provider store={mockStore2}>
      <MemoryRouter>
        <CreateCoverLetter />
      </MemoryRouter>
    </Provider>
  );
  const CompanyNameInput = screen.getByTestId("companyNameInput");
  fireEvent.change(CompanyNameInput, { target: { value: "Google" } });
  const jobTitleInput = screen.getByTestId("jobTitleInput");
  fireEvent.change(jobTitleInput, { target: { value: "Dream Job" } });
  const descriptionTextarea = screen.getByTestId("descriptionTextarea");
  fireEvent.change(descriptionTextarea, {
    target: { value: "Travel the world and make a lot of money" },
  });
  const submitButton = screen.getByRole("button");
  fireEvent.click(submitButton);

  await waitFor(
    () => {
      const letterContainer = document.getElementById("letterContainer");

      expect(letterContainer).toBeInTheDocument();
    },
    { timeout: 20000 }
  );
});
