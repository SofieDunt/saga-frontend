import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders home", () => {
  render(<App />);
  const linkElements: HTMLElement[] = screen.getAllByText(/saga/i);
  expect(linkElements.length).toEqual(2);
  for (let elem of linkElements) {
    expect(elem).toBeInTheDocument();
  }
});
