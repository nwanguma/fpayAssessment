const Confirmation = ({ payoutDetails }) => {
  return (
    <div className="card">
      <div className="container">
        <h3 className="card-heading__primary">
          Review details of your transfer
        </h3>
        <div className="container py-3 border-solid border-b border-custom-bg-grey">
          <div className="container flex flex-col md:flex-row justify-between py-2 px-1">
            <p className=" text-[13px] text-custom-text-compare">You send</p>
            <p className="text-right text-[16px] font-medium text-custom-text-currency">
              {payoutDetails.userAmount} {payoutDetails.baseCurrency}
            </p>
          </div>
          <div className="container flex flex-col md:flex-row justify-between py-2 px-1">
            <p className=" text-[13px] text-custom-text-compare">
              Total fees (included)
            </p>
            <p className="text-right text-[13px] text-custom-text-currency">
              {payoutDetails.fee} {payoutDetails.baseCurrency}
            </p>
          </div>
          <div className="container flex flex-col md:flex-row justify-between py-2 px-1">
            <p className=" text-[13px] text-custom-text-compare">
              Amount we’ll convert
            </p>
            <p className="text-right text-[13px] text-custom-text-currency">
              {payoutDetails.amountMinusFee} {payoutDetails.baseCurrency}
            </p>
          </div>
          <div className="container flex flex-col md:flex-row justify-between py-2 px-1">
            <p className=" text-[13px] text-custom-text-compare">
              Guaranteed rate
            </p>
            <p className="text-right text-[13px] text-custom-text-currency">
              {payoutDetails.rate}
            </p>
          </div>
          <div className="container flex flex-col md:flex-row justify-between py-2 px-1">
            <p className=" text-[13px] text-custom-text-compare">
              {payoutDetails.name.split(" ")[0]} gets
            </p>
            <p className="text-right text-[16px] font-medium text-custom-text-currency">
              {payoutDetails.convertedAmount} {payoutDetails.targetCurrency}
            </p>
          </div>
        </div>
        <div className="container py-3 border-solid border-b border-custom-bg-grey">
          <div className="container flex flex-col md:flex-row justify-between py-2 px-1">
            <p className=" text-[13px] text-custom-text-compare">Name</p>
            <p className="text-right text-[13px] text-custom-text-currency">
              {payoutDetails.name}
            </p>
          </div>
          <div className="container flex flex-col md:flex-row justify-between py-2 px-1">
            <p className=" text-[13px] text-custom-text-compare">
              Email address
            </p>
            <p className="text-right text-[13px] text-custom-text-currency">
              {payoutDetails.email}
            </p>
          </div>
          <div className="container flex flex-col md:flex-row justify-between py-2 px-1">
            <p className=" text-[13px] text-custom-text-compare">
              IBAN / Account number
            </p>
            <p className="text-right text-[13px] text-custom-text-currency">
              {payoutDetails.accountNumber}
            </p>
          </div>
        </div>
        <button className="btn w-[100%] text-custom-text-white bg-custom-text-green">
          Confirm and continue
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
