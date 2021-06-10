import { render, screen } from "../../custom-render";

import PayoutConfirmation from "./PayoutConfirmation";

describe("PayoutConfirmation", () => {
  const payoutDetails = {
    userAmount: "657",
    feeRate: 0.00369,
    fee: 6.65,
    amountMinusFee: 300,
    baseCurrency: "EUR",
    rates: {},
    rate: 30,
    targetCurrency: "NGN",
    convertedAmount: "509",
    fullname: "Will Tybur",
    mail: "willthemantybur@hotmail.com",
    accountNumber: "67679767676",
    swiftCode: "",
  };

  test("<PayoutConfirmation /> matches snapshot", () => {
    const component = render(
      <PayoutConfirmation payoutDetails={payoutDetails} />
    );

    expect(component.container).toMatchSnapshot();
  });

  test("It renders correctly", () => {
    render(<PayoutConfirmation payoutDetails={payoutDetails} />);

    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  test("It contains a button", () => {
    render(<PayoutConfirmation payoutDetails={payoutDetails} />);

    expect(
      screen.getByRole("button", { name: /Confirm and continue/i })
    ).toBeInTheDocument();
  });

  test("It contains the correct form data", () => {
    render(<PayoutConfirmation payoutDetails={payoutDetails} />);

    expect(
      screen.getByText(/willthemantybur@hotmail.com/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Will Tybur/i)).toBeInTheDocument();
    expect(screen.getByText(/NGN/i)).toBeInTheDocument();
    expect(screen.getByText(/67679767676/i)).toBeInTheDocument();
    expect(screen.queryByText(/chlamydia/i)).not.toBeInTheDocument();
  });
});

export {};
