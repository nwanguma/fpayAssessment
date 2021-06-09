import { useState } from "react";

const Amount = ({ payoutDetails, handleOnChange, handleProceed }) => {
  const [recipientRegion, setRecipientRegion] = useState("1");

  const handleRegionChange = ({ target }) => {
    const id = target.dataset.id;

    setRecipientRegion(id);
  };

  return (
    <div className="card">
      <div className="container mb-5">
        <h3 className="card-heading__primary">Your Recipient</h3>
        <p className="card-heading__secondary">Who are you sending money to?</p>
      </div>
      <form onSubmit={handleProceed} autoComplete="off">
        <div className="container relative h-[65px]">
          <label htmlFor="amount" className="label text-[13px] top-2">
            Their email (optional)
          </label>
          <input
            name="email"
            value={payoutDetails.email}
            onChange={handleOnChange}
            type="text"
            className="input h-[45px] py-3 px-[15px] text-custom-text-input2"
          ></input>
        </div>
        <div className="container relative h-[65px] mt-4">
          <label htmlFor="amount" className="label text-[13px] top-2">
            Full name of the account holder
          </label>
          <input
            name="name"
            value={payoutDetails.name}
            onChange={handleOnChange}
            type="text"
            className="input h-[45px] py-3 px-[15px] text-custom-text-input2"
          ></input>
        </div>
        <div className="container mt-5">
          <h3 className="py-3 border-solid font-medium border-b border-custom-bg-grey mb-5 text-sm leading-6 text-custom-text-blue not-italic">
            Bank Details
          </h3>
          <div className="flex">
            <p
              data-id="1"
              onClick={handleRegionChange}
              className={`px-2 sm:px-6 text-[13px] sm:text-base cursor-pointer ${
                recipientRegion === "1"
                  ? " border-custom-text-tab font-medium  border-b-2 border-solid text-custom-text-tab"
                  : "text-custom-text-compare"
              } pb-3 `}
            >
              Inside Europe
            </p>
            <p
              data-id="2"
              onClick={handleRegionChange}
              className={`px-2 sm:px-6 text-[13px] sm:text-base cursor-pointer ${
                recipientRegion === "2"
                  ? " border-custom-text-tab  font-medium border-b-2 border-solid text-custom-text-tab"
                  : "text-custom-text-compare"
              }`}
            >
              Outside Europe
            </p>
          </div>
          {recipientRegion === "2" && (
            <div className="container relative h-[65px] mt-4">
              <label htmlFor="amount" className="label text-[13px] top-2">
                SWIFT / BIC code
              </label>
              <input
                name="swiftCode"
                value={payoutDetails.swiftCode}
                onChange={handleOnChange}
                type="text"
                className="input h-[45px] py-3 px-[15px] text-custom-text-input2"
              ></input>
            </div>
          )}
          <div className="container relative h-[65px] mt-4">
            <label htmlFor="swiftCode" className="label text-[13px] top-2">
              {recipientRegion === "1" ? "IBAN" : "IBAN / Account Number"}
            </label>
            <input
              name="accountNumber"
              value={payoutDetails.accountNumber}
              onChange={handleOnChange}
              type="text"
              className="input h-[45px] py-3 px-[15px] text-custom-text-input2"
            ></input>
          </div>
        </div>
        <div className="container mt-8 flex justify-between">
          <button className="btn w-[100%] text-custom-text-white bg-custom-text-tab">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Amount;
