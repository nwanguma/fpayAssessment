import { render, screen } from "../custom-render";

import NotFound from "./notFound";

describe("NotFound", () => {
  test("<NotFound /> matches snapshot", () => {
    const component = render(<NotFound />);

    expect(component.container).toMatchSnapshot();
  });

  test("It renders children correctly", () => {
    const App = render(<NotFound />);

    expect(screen.getByTestId("container")).toBeInTheDocument();
  });

  test("It renders the correct text", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  test("It renders the correct link", () => {
    render(<NotFound />);

    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
  });
});

export {};
