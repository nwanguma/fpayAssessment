import { render, screen } from "../custom-render";

import Unavailable from "./Unavailable";

describe("Unavailable", () => {
  test("<Unavailable /> matches snapshot", () => {
    const component = render(<Unavailable />);

    expect(component.container).toMatchSnapshot();
  });

  test("It renders children correctly", () => {
    const App = render(<Unavailable />);

    expect(screen.getByTestId("container")).toBeInTheDocument();
  });

  test("It renders the correct text", () => {
    render(<Unavailable />);

    expect(screen.getByText("503")).toBeInTheDocument();
  });

  test("It renders the correct link", () => {
    render(<Unavailable />);

    expect(screen.getByText("Refresh Page").closest("a")).toHaveAttribute(
      "href",
      "/"
    );
  });
});

export {};
