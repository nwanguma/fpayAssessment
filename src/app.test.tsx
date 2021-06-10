import { render, screen } from "@testing-library/react";

import App from "./app";

describe("App", () => {
  test("<App /> matches snapshot", () => {
    const component = render(<App />);

    expect(component.container).toMatchSnapshot();
  });

  test("It renders logo", () => {
    render(<App />);

    expect(screen.getByAltText("fliqpay")).toBeInTheDocument();
  });

  test("It renders correctly", () => {
    render(<App />);

    expect(screen.getByText("Send money internationally")).toBeInTheDocument();
  });

  test("It renders some buttons", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
  });
});

export {};
