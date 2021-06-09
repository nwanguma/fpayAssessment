import { useState, useReducer } from "react";

import payoutReducer, { initialState } from "./payout-reducer";

import { UPDATE_DETAILS } from "../../utils/types";

import Confirmation from "./Confirmation";
import Amount from "./Amount";
import Recipient from "./Recipient";

import logo from "../../assets/images/logo.svg";
import button from "../../assets/images/button.svg";

const classes = {
  "header-content":
    "container w-[100%] md:w-[75%] mx-auto flex items-center py-6 justify-between",
  steps: "flex-1 mx-[5%] sm:mx-[5%] md:mx-[15%]",
  "progress-bar": "bg-custom-bg-span mx-auto w-[76%] h-[2px]",
  indicator: (status) =>
    `${
      status === 1
        ? "w-[0px]"
        : status === 2
        ? "w-[38.33%] xs:w-[33.33%]"
        : status === 3
        ? "w-[69.66%] xs:w-[66.66%]"
        : "w-[100%]"
    } h-[2px] progress-bar`,
  payoutStepsIndicator: (status, id) =>
    status === id ? "payout-steps__tab__indicator" : "hidden",
  payoutStepsText: (status, id) =>
    status === id
      ? "payout-steps__tab__text--active"
      : "payout-steps__tab__text",
};

const Payout = () => {
  const [payoutDetails, dispatch] = useReducer(payoutReducer, initialState);
  const [status, setStatus] = useState(1);

  const handleOnChange = ({ target }) => {
    dispatch({
      type: UPDATE_DETAILS,
      payload: {
        [target.name]: target.value,
      },
    });
  };

  /*
  Accessing dom attributes in handlers can be wonky, this is why I'm 
  passing the data object directly 
  */
  const handleCurrencyToggle = (data) => {
    dispatch({
      type: UPDATE_DETAILS,
      payload: {
        [data.id]: data.name,
      },
    });
  };

  const handleProceed = () => {
    setStatus(status + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("Success");
  };

  return (
    <div className="wrapper">
      <header className="header--payout">
        <div className={classes["header-content"]}>
          <img className="w-15 sm:w-20" src={logo} alt="fliqpay" />
          <div className={classes.steps}>
            <div className={classes["progress-bar"]}>
              <div className={classes.indicator(status)}></div>
            </div>
            <div className="payout-steps">
              <div className="payout-steps__tab">
                <span
                  className={classes.payoutStepsIndicator(status, 1)}
                ></span>
                <span className={classes.payoutStepsText(status, 1)}>
                  Amount
                </span>
              </div>
              <div className="payout-steps__tab ">
                <span
                  className={classes.payoutStepsIndicator(status, 2)}
                ></span>
                <span className={classes.payoutStepsText(status, 2)}>
                  Recipient
                </span>
              </div>
              <div className="payout-steps__tab ">
                <span
                  className={classes.payoutStepsIndicator(status, 3)}
                ></span>
                <span className={classes.payoutStepsText(status, 3)}>
                  Review
                </span>
              </div>
              <div className="payout-steps__tab ">
                <span
                  className={classes.payoutStepsIndicator(status, 4)}
                ></span>
                <span className={classes.payoutStepsText(status, 4)}>Pay</span>
              </div>
            </div>
          </div>
          <img src={button} alt="toggle" />
        </div>
      </header>
      {
        {
          1: (
            <Amount
              payoutDetails={payoutDetails}
              handleOnChange={handleOnChange}
              handleCurrencyToggle={handleCurrencyToggle}
              handleProceed={handleProceed}
            />
          ),
          2: (
            <Recipient
              payoutDetails={payoutDetails}
              handleOnChange={handleOnChange}
              handleProceed={handleProceed}
            />
          ),
          3: (
            <Confirmation
              payoutDetails={payoutDetails}
              handleOnChange={handleOnChange}
              handleProceed={handleSubmit}
            />
          ),
        }[status]
      }
    </div>
  );
};

export default Payout;
