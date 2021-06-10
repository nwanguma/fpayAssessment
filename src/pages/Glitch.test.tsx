import React from "react";
import { render, screen } from "../custom-render";

import Glitch from "./Glitch";

describe("Glitch", () => {
  test("<Glitch /> matches snapshot", () => {
    const component = render(<Glitch />);

    expect(component.container).toMatchSnapshot();
  });

  test("It renders children correctly", () => {
    const App = render(<Glitch />);

    expect(screen.getByTestId("container")).toBeInTheDocument();
  });

  test("It renders the correct text", () => {
    render(<Glitch />);

    expect(screen.getByText("There’s been a glitch…")).toBeInTheDocument();
  });

  test("It renders the correct link", () => {
    render(<Glitch />);

    expect(screen.getByText("Refresh Page").closest("a")).toHaveAttribute(
      "href",
      "/"
    );
  });
});

export {};
