import { State } from "./payout-reducer";

interface IProps {
  payoutDetails: State;
  handleSubmit: () => void;
}

interface Classes {
  section: string;
  sectionItem: string;
  sectionItemLabel: string;
  sectionItemDetail: string;
  sectionItemDetailBold: string;
  btn: string;
}

const classes: Classes = {
  section: "container py-3 border-solid border-b border-white-border",
  sectionItem: "container flex flex-col md:flex-row justify-between py-2 px-1",
  sectionItemLabel: "text-[13px] text-grey-label",
  sectionItemDetail: "text-right text-[13px] text-grey-medium",
  sectionItemDetailBold: "text-right text-[16px] font-medium text-grey-medium",
  btn: "btn w-[100%] text-white-main bg-green-button",
};

const Confirmation: React.FC<IProps> = ({ payoutDetails, handleSubmit }) => {
  return (
    <div className="card">
      <div className="container">
        <h3 className="card-heading__primary">
          Review details of your transfer
        </h3>
        <div className={classes.section}>
          <div className={classes.sectionItem}>
            <p className={classes.sectionItemLabel}>You send</p>
            <p className={classes.sectionItemDetailBold}>
              {payoutDetails.userAmount} {payoutDetails.baseCurrency}
            </p>
          </div>
          <div className={classes.sectionItem}>
            <p className={classes.sectionItemLabel}>Total fees (included)</p>
            <p className={classes.sectionItemDetail}>
              {payoutDetails.fee} {payoutDetails.baseCurrency}
            </p>
          </div>
          <div className={classes.sectionItem}>
            <p className={classes.sectionItemLabel}>Amount we’ll convert</p>
            <p className={classes.sectionItemDetail}>
              {payoutDetails.amountMinusFee} {payoutDetails.baseCurrency}
            </p>
          </div>
          <div className={classes.sectionItem}>
            <p className={classes.sectionItemLabel}>Guaranteed rate</p>
            <p className={classes.sectionItemDetail}>{payoutDetails.rate}</p>
          </div>
          <div className={classes.sectionItem}>
            <p className={classes.sectionItemLabel}>
              {payoutDetails.fullname.split(" ")[0]} gets
            </p>
            <p className={classes.sectionItemDetailBold}>
              {payoutDetails.convertedAmount} {payoutDetails.targetCurrency}
            </p>
          </div>
        </div>
        <div className={classes.section}>
          <div className={classes.sectionItem}>
            <p className={classes.sectionItemLabel}>Name</p>
            <p className={classes.sectionItemDetail}>
              {payoutDetails.fullname}
            </p>
          </div>
          <div className={classes.sectionItem}>
            <p className={classes.sectionItemLabel}>Email address</p>
            <p className={classes.sectionItemDetail}>{payoutDetails.mail}</p>
          </div>
          <div className={classes.sectionItem}>
            <p className={classes.sectionItemLabel}>IBAN / Account number</p>
            <p className={classes.sectionItemDetail}>
              {payoutDetails.accountNumber}
            </p>
          </div>
        </div>
        <button className={classes.btn}>Confirm and continue</button>
      </div>
    </div>
  );
};

export default Confirmation;
