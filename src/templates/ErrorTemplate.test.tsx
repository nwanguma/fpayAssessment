import { render, screen } from "../custom-render";
import sample from "../assets/images/503.png";

import ErrorTemplate from "./ErrorTemplate";

describe("ErrorTemplate", () => {
  test("<ErrorTemplate /> matches snapshot", () => {
    const component = render(
      <ErrorTemplate image={sample}>
        <div>Test</div>
      </ErrorTemplate>
    );

    expect(component.container).toMatchSnapshot();
  });

  test("It renders children", () => {
    const App = render(
      <ErrorTemplate image={sample}>
        <div>Test</div>
      </ErrorTemplate>
    );

    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
  });

  test("It renders the correct link", () => {
    render(
      <ErrorTemplate image={sample}>
        <div>Test</div>
      </ErrorTemplate>
    );

    expect(screen.getByAltText("fliqpay").closest("a")).toHaveAttribute(
      "href",
      "/"
    );
  });
});

export {};
