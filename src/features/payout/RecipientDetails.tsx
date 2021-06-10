import { useState } from "react";

import validateFormData, { Error } from "../../validation/validateFormData";
import { Event, SubmitEvent, ToggleData } from "./payout";
import { State } from "./payout-reducer";

interface IProps {
  payoutDetails: State;
  handleOnChange: (e: Event) => void;
  handleProceed: () => void;
}

interface Classes {
  sectionHeading: string;
  tab: (region: number, id: number) => string;
  label: string;
  input: (error: boolean) => string;
  btn: string;
}

interface ValidationState {
  [key: string]: string;
}

const classes: Classes = {
  sectionHeading:
    "py-3 border-solid font-medium border-b border-white-border mb-5 text-sm leading-6 text-blue-text not-italic",
  tab: (region: number, id: number) =>
    `px-2 sm:px-6 text-[13px] sm:text-base cursor-pointer ${
      region === id
        ? " border-blue-tab font-medium  border-b-2 border-solid text-blue-tab"
        : "text-grey-label"
    } pb-3`,
  label: "label text-[13px] top-2",
  input: (error: boolean): string =>
    `${
      error ? "border-red-error" : "border-white-border-alt"
    } input h-[45px] py-3 px-[15px] text-grey-light`,
  btn: "btn w-[100%] text-white-main bg-blue-tab",
};

const Amount: React.FC<IProps> = ({
  payoutDetails,
  handleOnChange,
  handleProceed,
}) => {
  const [validationErrors, setValidationErrors] = useState<Error>({});
  const [recipientRegion, setRecipientRegion] = useState(1);

  const handleRegionChange = (id: number): void => {
    setRecipientRegion(id);
  };

  const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();

    const { fullname, mail, accountNumber, swiftCode } = payoutDetails;

    const formState: ValidationState = {
      fullname,
      mail,
      accountNumber,
      swiftCode,
    };

    if (!swiftCode) delete formState.swiftCode;

    const keys = Object.keys(formState);
    const errors = validateFormData(formState, keys);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    handleProceed();
  };

  return (
    <div className="card">
      <div className="container mb-5">
        <h3 className="card-heading__primary">Your Recipient</h3>
        <p className="card-heading__secondary">Who are you sending money to?</p>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="container relative h-[65px]">
          <label htmlFor="amount" className={classes.label}>
            Their email (optional)
          </label>
          <input
            name="mail"
            value={payoutDetails.mail}
            autoComplete="user-address"
            onChange={handleOnChange}
            type="text"
            className={classes.input(
              validationErrors.mail && validationErrors.mail.error
            )}
          ></input>
        </div>
        <div className="container relative h-[65px] mt-4">
          <label htmlFor="amount" className={classes.label}>
            Full name of the account holder
          </label>
          <input
            name="fullname"
            autoComplete="user-fullname"
            value={payoutDetails.fullname}
            onChange={handleOnChange}
            type="text"
            className={classes.input(
              validationErrors.fullname && validationErrors.fullname.error
            )}
          ></input>
        </div>
        <div className="container mt-5">
          <h3 className={classes.sectionHeading}>Bank Details</h3>
          <div className="flex">
            <p
              onClick={() => handleRegionChange(1)}
              className={classes.tab(recipientRegion, 1)}
            >
              Inside Europe
            </p>
            <p
              onClick={() => handleRegionChange(2)}
              className={classes.tab(recipientRegion, 2)}
            >
              Outside Europe
            </p>
          </div>
          {recipientRegion === 2 && (
            <div className="container relative h-[65px] mt-4">
              <label htmlFor="amount" className={classes.label}>
                SWIFT / BIC code
              </label>
              <input
                name="swiftCode"
                value={payoutDetails.swiftCode}
                onChange={handleOnChange}
                type="text"
                className={classes.input(
                  validationErrors.swiftCode && validationErrors.swiftCode.error
                )}
              ></input>
            </div>
          )}
          <div className="container relative h-[65px] mt-4">
            <label htmlFor="swiftCode" className={classes.label}>
              {recipientRegion === 1 ? "IBAN" : "IBAN / Account Number"}
            </label>
            <input
              name="accountNumber"
              value={payoutDetails.accountNumber}
              onChange={handleOnChange}
              type="text"
              className={classes.input(
                validationErrors.accountNumber &&
                  validationErrors.accountNumber.error
              )}
            ></input>
          </div>
        </div>
        <div className="container mt-8 flex justify-between">
          <button className={classes.btn}>Continue</button>
        </div>
      </form>
    </div>
  );
};

export default Amount;
