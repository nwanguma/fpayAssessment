import { render, screen } from "../../custom-render";
import userEvent from "@testing-library/user-event";

import RecipientDetails from "./RecipientDetails";

describe("RecipientDetails", () => {
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

  test("<RecipientDetails /> matches snapshot", () => {
    const component = render(
      <RecipientDetails
        payoutDetails={payoutDetails}
        handleOnChange={handleOnChange}
        handleProceed={handleProceed}
      />
    );

    expect(component.container).toMatchSnapshot();
  });

  test("It renders correctly", () => {
    render(
      <RecipientDetails
        payoutDetails={payoutDetails}
        handleOnChange={handleOnChange}
        handleProceed={handleProceed}
      />
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  test("It contains a button", () => {
    render(
      <RecipientDetails
        payoutDetails={payoutDetails}
        handleOnChange={handleOnChange}
        handleProceed={handleProceed}
      />
    );

    expect(
      screen.getByRole("button", { name: "Continue" })
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

  test("shows all required input fields with empty values", () => {
    const { getByTestId } = render(
      <RecipientDetails
        payoutDetails={payoutDetails}
        handleOnChange={handleOnChange}
        handleProceed={handleProceed}
      />
    );

    const userMail = getByTestId("user-mail") as HTMLInputElement;
    const userFullname = getByTestId("user-full") as HTMLInputElement;
    const accountNumber = getByTestId("account-number") as HTMLInputElement;

    expect(userMail.value).toBe("");
    expect(userFullname.value).toBe("");
    expect(accountNumber.value).toBe("");
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

  test("It should update input value with sample text", () => {
    const { getByTestId } = render(
      <RecipientDetails
        payoutDetails={payoutDetails}
        handleOnChange={handleOnChange}
        handleProceed={handleProceed}
      />
    );

    const input = getByTestId("user-mail") as HTMLInputElement;

    userEvent.type(input, "user@fliqpay.com");

    expect(input).toHaveValue("user@fliqpay.com");
  });
});

export {};
