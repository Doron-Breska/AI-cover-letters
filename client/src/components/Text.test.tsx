import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Text from "./Text";

describe("App", () => {
  it("Vite to be in document", () => {
    render(<Text />);
    expect(screen.getByText("Vite")).toBeInTheDocument();
  });
});

test("renders 'vite' in the component", () => {
  render(<Text />);
  const textShouldBeIn = screen.getByText(/Vite/i);
  expect(textShouldBeIn).toBeInTheDocument();
});
