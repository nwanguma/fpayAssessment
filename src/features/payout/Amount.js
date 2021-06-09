import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash/debounce";

import { GET_FIXER_LATEST_RATE } from "../../utils/constants";

import mapCurrencyToFlag from "./mapCurrencyToFlag";

import gbp from "../../assets/images/gbr.svg";
import ngn from "../../assets/images/ngr.svg";
import eur from "../../assets/images/eur.svg";
import usd from "../../assets/images/usd.svg";

import formatCurrency from "../../utils/formatCurrency";

const classes = {
  formGroup: (completedConversion) =>
    `container ${completedConversion ? "" : "mb-2"} relative h-[65px]`,
  input:
    "input h-[65px] pl-4 py-3 pt-7 pr-[100px] sm:pr-[140px] text-custom-text-blue",
  dropdownList: (dropdown) =>
    `${dropdown ? "min-h-[65px]" : "h-0 overflow-hidden"} container`,
  dropdownListItem: (dropdown) =>
    ` ${dropdown ? "dropdown__list" : "hidden overflow-hidden"}`,

  btn: "btn w-[48%] sm:w-[210.71px] text-custom-text-white bg-custom-bg-button",
  btnInverse:
    "btn w-[48%] sm:w-[210.71px] border-custom-bg-button border-solid border text-custom-text-button",
};

const Amount = ({
  payoutDetails,
  handleOnChange,
  handleCurrencyToggle,
  handleProceed,
}) => {
  const [toggleBaseCurrencyDropdown, setToggleBaseCurrencyDropdown] =
    useState("");
  const [toggleTargetCurrencyDropdown, setToggleTargetCurrencyDropdown] =
    useState("");

  useEffect(() => {
    const { feeRate, userAmount } = payoutDetails;

    const fee = calculateFee(feeRate, userAmount);

    handleOnChange({
      target: {
        name: "fee",
        value: fee,
      },
    });
  }, [payoutDetails.userAmount]);

  useEffect(() => {
    const { fee, userAmount } = payoutDetails;

    if (fee) {
      const amountMinusFee = calculatePayable(fee, userAmount);

      handleOnChange({
        target: {
          name: "amountMinusFee",
          value: amountMinusFee,
        },
      });
    }

    const amountMinusFee = calculatePayable(fee, userAmount);

    handleOnChange({
      target: {
        name: "amountMinusFee",
        value: amountMinusFee,
      },
    });
  }, [payoutDetails.fee]);

  useEffect(() => {
    let isCancelled;

    const { rates, targetCurrency } = payoutDetails;

    const isEmpty = Object.keys(rates).length === 0;

    if (!isCancelled && !isEmpty) {
      getRate(rates, targetCurrency);
    }

    return () => {
      isCancelled = true;
    };
  }, [payoutDetails.rates]);

  useEffect(() => {
    let isCancelled;

    const { rates, targetCurrency } = payoutDetails;

    if (!isCancelled) {
      getRate(rates, targetCurrency);
    }

    return () => {
      isCancelled = true;
    };
  }, [payoutDetails.targetCurrency]);

  useEffect(() => {
    let isCancelled;

    const { baseCurrency } = payoutDetails;

    if (!isCancelled) {
      getCurrentRate(baseCurrency);
    }

    return () => {
      isCancelled = true;
    };
  }, [payoutDetails.baseCurrency]);

  useEffect(() => {
    let isCancelled;

    const { amountMinusFee, rate } = payoutDetails;

    if (!isCancelled && amountMinusFee && rate) {
      const convertedAmount = convertCurrencies(amountMinusFee, rate);

      handleOnChange({
        target: {
          name: "convertedAmount",
          value: convertedAmount,
        },
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [payoutDetails.amountMinusFee, payoutDetails.rate]);

  const calculateFee = (feeRate, userAmount) => {
    return feeRate * userAmount;
  };

  const calculatePayable = (fee, userAmount) => {
    return userAmount - fee;
  };

  const getCurrentRate = async (baseCurrency) => {
    try {
      const res = await axios.get(
        `${GET_FIXER_LATEST_RATE}?access_key=${process.env.REACT_APP_FIXER_API_KEY}&base=${baseCurrency}&symbols=EUR,NGN,GBP,USD`
      );

      const rates = res.data.rates;

      if (typeof rates === "object" && Object.keys(rates).length > 0) {
        formatRates(rates);
      }

      handleOnChange({
        target: {
          name: "rates",
          value: rates || {},
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const formatRates = (rates) => {
    const ratesKeys = Object.keys(rates);

    return ratesKeys.forEach((key) => {
      rates[key] = formatCurrency(rates[key]);
    });
  };

  const getRate = (rates, currency) => {
    const rate = rates[currency];

    handleOnChange({
      target: {
        name: "rate",
        value: rate,
      },
    });
  };

  const convertCurrencies = (payable, rate) => {
    return payable * rate;
  };

  const debounceFunc = useCallback(
    debounce((e) => handleOnChange(e), 5000),
    []
  );

  const handleChangeWithDebounce = (e) => {
    debounceFunc(e);
  };

  const handleToggleBaseCurrency = ({ target }) => {
    if (toggleBaseCurrencyDropdown)
      setToggleBaseCurrencyDropdown(!toggleBaseCurrencyDropdown);

    if (!toggleBaseCurrencyDropdown) setToggleBaseCurrencyDropdown(true);
  };

  const handleToggleTargetCurrency = ({ target }) => {
    if (toggleTargetCurrencyDropdown)
      setToggleTargetCurrencyDropdown(!toggleTargetCurrencyDropdown);

    if (!toggleTargetCurrencyDropdown) setToggleTargetCurrencyDropdown(true);
  };

  const {
    userAmount,
    targetCurrency,
    fee,
    rate,
    amountMinusFee,
    rates,
    convertedAmount,
  } = payoutDetails;

  const completedConversion =
    userAmount &&
    targetCurrency &&
    fee &&
    amountMinusFee &&
    Object.keys(rates).length > 0 &&
    rate &&
    convertedAmount;

  return (
    <div className="card">
      <div className="container mb-5">
        <h3 className="card-heading__primary">One-time Payout</h3>
        <p className="card-heading__secondary">Send money internationally</p>
      </div>
      <form onSubmit={handleProceed} autoComplete="off">
        <div className={classes.formGroup(completedConversion)}>
          <label htmlFor="userAmount" className="label--inset">
            You send
          </label>
          <input
            name="userAmount"
            type="text"
            onChange={handleChangeWithDebounce}
            className={classes.input}
          ></input>
          <ul className="dropdown__container">
            <li
              role="button"
              aria-labelledby="dropdown-label"
              className="dropdown__toggle"
              data-id="baseCurrency"
              onClick={handleToggleBaseCurrency}
            >
              <img
                className="dropdown__list__item__image"
                src={mapCurrencyToFlag(payoutDetails.baseCurrency)}
                alt="country flag"
              />
              <span className="dropdown__list__item__text">
                {payoutDetails.baseCurrency}
              </span>
            </li>
            <li
              role="list"
              className={classes.dropdownList(toggleBaseCurrencyDropdown)}
            >
              <ul
                className={classes.dropdownListItem(toggleBaseCurrencyDropdown)}
              >
                <li
                  onClick={(e) => {
                    handleCurrencyToggle({
                      id: "baseCurrency",
                      name: "EUR",
                    });
                    handleToggleBaseCurrency(e);
                  }}
                  className="dropdown__list__item"
                  data-id="baseCurrency"
                  data-name="EUR"
                >
                  <img
                    className="dropdown__list__item__image"
                    src={eur}
                    alt="country flag"
                  />
                  <span className="dropdown__list__item__text">EUR</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {completedConversion && (
          <div className="container">
            <div className="container pl-[18px]">
              <div className="flex py-[10px] border-l-2 border-solid border-custom-bg-span">
                <span className="relative right-[11px] leading-[20px] inline-block w-5 h-5 rounded-xl text-center text-custom-text-compare bg-custom-bg-span">
                  -
                </span>
                <p className="mx-1 sm:mx-4 text-sm leading-6 text-custom-text-compare">
                  {payoutDetails.fee} {payoutDetails.baseCurrency}
                </p>
                <p className="text-[13px] sm:text-sm leading-6 text-custom-text-compare">
                  Transfer fee
                </p>
              </div>
            </div>
            <div className="container pl-[18px]">
              <div className="flex py-[10px] border-l-2 border-solid border-custom-bg-span">
                <span className="relative right-[11px] leading-[20px] inline-block w-5 h-5 rounded-xl text-center text-custom-text-compare bg-custom-bg-span">
                  =
                </span>
                <p className="mx-1 sm:mx-4 text-sm leading-6 text-custom-text-compare">
                  {payoutDetails.amountMinusFee} {payoutDetails.baseCurrency}
                </p>
                <p className="text-[13px] sm:text-sm leading-6 text-custom-text-compare">
                  Amount we’ll convert
                </p>
              </div>
            </div>
            <div className="container pl-[18px]">
              <div className="flex py-[10px] border-l-2 border-solid border-custom-bg-span">
                <span className="relative leading-[20px] right-[11px] inline-block w-5 h-5 rounded-xl text-center text-custom-text-compare bg-custom-bg-span">
                  x
                </span>
                <p className="mx-1 sm:mx-4 text-sm leading-6 text-custom-text-compare-bold">
                  {payoutDetails.rate} {payoutDetails.baseCurrency}
                </p>
                <p className="text-[13px] sm:text-sm text-sm leading-6 font-medium text-custom-text-compare-bold">
                  Guaranteed rate (1hr)
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="container relative h-[65px]">
          <label htmlFor="amount" className="label--inset">
            Recipient gets
          </label>
          <input
            name="convertedAmount"
            type="text"
            value={payoutDetails.convertedAmount}
            disabled
            className={classes.input}
          ></input>
          <ul className="dropdown__container">
            <li
              role="button"
              aria-labelledby="dropdown-label"
              className="dropdown__toggle"
              data-id="targetCurrency"
              onClick={handleToggleTargetCurrency}
            >
              <img
                className="dropdown__list__item__image"
                src={mapCurrencyToFlag(payoutDetails.targetCurrency)}
                alt="country flag"
              />
              <span className="dropdown__list__item__text">
                {payoutDetails.targetCurrency}
              </span>
            </li>
            <li
              role="list"
              className={classes.dropdownList(toggleTargetCurrencyDropdown)}
            >
              <ul
                className={classes.dropdownListItem(
                  toggleTargetCurrencyDropdown
                )}
              >
                <li
                  onClick={(e) => {
                    handleCurrencyToggle({
                      id: "targetCurrency",
                      name: "USD",
                    });
                    handleToggleTargetCurrency(e);
                  }}
                  className="dropdown__list__item"
                  data-id="targetCurrency"
                  data-name="USD"
                >
                  <img
                    className="dropdown__list__item__image"
                    src={usd}
                    alt="country flag"
                  />
                  <span className="dropdown__list__item__text">USD</span>
                </li>
                <li
                  onClick={(e) => {
                    handleCurrencyToggle({
                      id: "targetCurrency",
                      name: "EUR",
                    });
                    handleToggleTargetCurrency(e);
                  }}
                  className="dropdown__list__item"
                  data-id="targetCurrency"
                  data-name="EUR"
                >
                  <img
                    className="dropdown__list__item__image"
                    src={eur}
                    alt="country flag"
                  />
                  <span className="dropdown__list__item__text">EUR</span>
                </li>
                <li
                  onClick={(e) => {
                    handleCurrencyToggle({
                      id: "targetCurrency",
                      name: "NGN",
                    });
                    handleToggleTargetCurrency(e);
                  }}
                  className="dropdown__list__item"
                  data-id="targetCurrency"
                  data-name="NGN"
                >
                  <img
                    className="dropdown__list__item__image"
                    src={ngn}
                    alt="country flag"
                  />
                  <span className="dropdown__list__item__text">NGN</span>
                </li>
                <li
                  onClick={(e) => {
                    handleCurrencyToggle({
                      id: "targetCurrency",
                      name: "GBP",
                    });
                    handleToggleTargetCurrency(e);
                  }}
                  className="dropdown__list__item"
                  data-id="targetCurrency"
                  data-name="GBP"
                >
                  <img
                    className="dropdown__list__item__image"
                    src={gbp}
                    alt="country flag"
                  />
                  <span className="dropdown__list__item__text">GBP</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="container mt-8 flex justify-between">
          <button className={classes.btnInverse}>Compate rates</button>
          <button className={classes.btn}>Continue</button>
        </div>
      </form>
    </div>
  );
};

export default Amount;
