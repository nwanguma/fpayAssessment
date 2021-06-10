import { render, screen } from "../../custom-render";
import userEvent from "@testing-library/user-event";

import AmountDetails from "./AmountDetails";

describe("AmountDetails", () => {
  const payoutDetails = {
    userAmount: "",
    feeRate: 0.00369,
    fee: 0,
    amountMinusFee: 0,
    baseCurrency: "EUR",
    rates: {},
    rate: 0,
    targetCurrency: "NGN",
    convertedAmount: "",
    fullname: "",
    mail: "",
    accountNumber: "",
    swiftCode: "",
  };

  const handleOnChange = jest.fn();
  const handleProceed = jest.fn();
  const handleCurrencyToggle = jest.fn();

  test("<AmountDetails /> matches snapshot", () => {
    const component = render(
      <AmountDetails
        payoutDetails={payoutDetails}
        handleCurrencyToggle={handleCurrencyToggle}
        handleOnChange={handleOnChange}
        handleProceed={handleProceed}
      />
    );

    expect(component.container).toMatchSnapshot();
  });

  test("It renders correctly", () => {
    render(
      <AmountDetails
        payoutDetails={payoutDetails}
        handleCurrencyToggle={handleCurrencyToggle}
        handleOnChange={handleOnChange}
        handleProceed={handleProceed}
      />
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  test("It contains a button named continue", () => {
    render(
      <AmountDetails
        payoutDetails={payoutDetails}
        handleCurrencyToggle={handleCurrencyToggle}
        handleOnChange={handleOnChange}
        handleProceed={handleProceed}
      />
    );

    expect(
      screen.getByRole("button", { name: "Continue" })
    ).toBeInTheDocument();
  });

  test("It contains a button named compare rates", () => {
    render(
      <AmountDetails
        payoutDetails={payoutDetails}
        handleCurrencyToggle={handleCurrencyToggle}
        handleOnChange={handleOnChange}
        handleProceed={handleProceed}
      />
    );

    expect(
      screen.getByRole("button", { name: "Compare rates" })
    ).toBeInTheDocument();
  });
});

describe("Test form", () => {
  const payoutDetails = {
    userAmount: "",
    feeRate: 0.00369,
    fee: 0,
    amountMinusFee: 0,
    baseCurrency: "EUR",
    rates: {},
    rate: 0,
    targetCurrency: "NGN",
    convertedAmount: "",
    fullname: "",
    mail: "",
    accountNumber: "",
    swiftCode: "",
  };

  const handleOnChange = jest.fn();
  const handleProceed = jest.fn();
  const handleCurrencyToggle = jest.fn();

  test("shows all required input fields with empty values", () => {
    const { getByTestId } = render(
      <AmountDetails
        payoutDetails={payoutDetails}
        handleCurrencyToggle={handleCurrencyToggle}
        handleOnChange={handleOnChange}
        handleProceed={handleProceed}
      />
    );

    const userAmount = getByTestId("user-amount") as HTMLInputElement;
    const convertedAmount = getByTestId("converted-amount") as HTMLInputElement;

    expect(userAmount.value).toBe("");
    expect(convertedAmount.value).toBe("");
  });
});

describe("Simulate input interaction", () => {
  const payoutDetails = {
    userAmount: "",
    feeRate: 0.00369,
    fee: 0,
    amountMinusFee: 0,
    baseCurrency: "EUR",
    rates: {},
    rate: 0,
    targetCurrency: "NGN",
    convertedAmount: "",
    fullname: "",
    mail: "",
    accountNumber: "",
    swiftCode: "",
  };

  const handleOnChange = jest.fn();
  const handleProceed = jest.fn();
  const handleCurrencyToggle = jest.fn();

  test("It should update input value with sample text", () => {
    const { getByTestId } = render(
      <AmountDetails
        payoutDetails={payoutDetails}
        handleCurrencyToggle={handleCurrencyToggle}
        handleOnChange={handleOnChange}
        handleProceed={handleProceed}
      />
    );

    const input = getByTestId("user-amount");

    userEvent.type(input, "645");

    expect(input).toHaveValue("645");
  });

  test("It should show disabled input field", () => {
    const { getByTestId } = render(
      <AmountDetails
        payoutDetails={payoutDetails}
        handleCurrencyToggle={handleCurrencyToggle}
        handleOnChange={handleOnChange}
        handleProceed={handleProceed}
      />
    );

    const input = getByTestId("converted-amount") as HTMLInputElement;

    expect(input).toBeDisabled();
  });
});

export {};
