import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";

import validateFormData, { Error } from "../../validation/validateFormData";
import { GET_FIXER_LATEST_RATE } from "../../utils/constants";
import { Event, SubmitEvent, ToggleData } from "./payout";
import { State } from "./payout-reducer";

import mapCurrencyToFlag from "./mapCurrencyToFlag";

import gbp from "../../assets/images/gbr.svg";
import ngn from "../../assets/images/ngr.svg";
import eur from "../../assets/images/eur.svg";
import usd from "../../assets/images/usd.svg";

import formatCurrency from "../../utils/formatCurrency";

interface IProps {
  payoutDetails: State;
  handleOnChange: (e: Event) => void;
  handleCurrencyToggle: (data: ToggleData) => void;
  handleProceed: () => void;
}

interface Classes {
  formGroup: (completedConversion: boolean) => string;
  input: (error: boolean) => string;
  dropdownList: (dropdown: boolean) => string;
  dropdownListItem: (dropdown: boolean) => string;
  btn: string;
  btnInverse: string;
}

const classes: Classes = {
  formGroup: (completedConversion: boolean): string =>
    `container ${completedConversion ? "" : "mb-2"} relative h-[65px]`,
  input: (error: boolean): string =>
    `${
      error ? "border-red-error" : "border-white-border-alt"
    } input h-[65px] pl-4 py-3 pt-7 pr-[100px] sm:pr-[140px] text-blue-text`,
  dropdownList: (dropdown: boolean): string =>
    `${dropdown ? "min-h-[65px]" : "h-0 overflow-hidden"} container`,
  dropdownListItem: (dropdown: boolean): string =>
    ` ${dropdown ? "dropdown__list" : "hidden overflow-hidden"}`,

  btn: "btn w-[48%] sm:w-[210.71px] text-white-main bg-blue-button",
  btnInverse:
    "btn w-[48%] sm:w-[210.71px] border-blue-button border-solid border text-blue-button",
};

const Amount: React.FC<IProps> = ({
  payoutDetails,
  handleOnChange,
  handleCurrencyToggle,
  handleProceed,
}) => {
  const [validationErrors, setValidationErrors] = useState<Error>({});
  const [toggleBaseCurrencyDropdown, setToggleBaseCurrencyDropdown] =
    useState(false);
  const [toggleTargetCurrencyDropdown, setToggleTargetCurrencyDropdown] =
    useState(false);

  useEffect(() => {
    const { feeRate, userAmount } = payoutDetails;
    const userAmountToNumber = +userAmount;

    const fee = calculateFee(feeRate, userAmountToNumber);

    handleOnChange({
      target: {
        name: "fee",
        value: formatCurrency(fee),
      },
    });
  }, [payoutDetails.userAmount]);

  useEffect(() => {
    const { fee, userAmount } = payoutDetails;
    const userAmountToNumber = +userAmount;

    const amountMinusFee = calculatePayable(fee, userAmountToNumber);

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

  const calculateFee = (feeRate: number, userAmount: number): number => {
    return feeRate * userAmount;
  };

  const calculatePayable = (fee: number, userAmount: number): number => {
    return userAmount - fee;
  };

  const getCurrentRate = async (baseCurrency: string) => {
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
      // console.log(e);
    }
  };

  const formatRates = (rates: { [key: string]: string }): void => {
    const ratesKeys: string[] = Object.keys(rates);

    return ratesKeys.forEach((key: string): void => {
      rates[key] = formatCurrency(rates[key]);
    });
  };

  const getRate = (
    rates: { [key: string]: string },
    currency: string
  ): void => {
    const rate = rates[currency];

    handleOnChange({
      target: {
        name: "rate",
        value: rate,
      },
    });
  };

  const convertCurrencies = (payable: number, rate: number): string => {
    return `${formatCurrency(payable * rate)}`;
  };

  /* This batches the amount input's events into one single event
    and fires off after 5000ms 
  */
  const debounceFunc = useCallback(
    debounce((e: Event) => handleOnChange(e), 5000),
    []
  );

  const handleChangeWithDebounce = (e: Event) => {
    debounceFunc(e);
  };

  const handleToggleBaseCurrency = (): void => {
    if (toggleBaseCurrencyDropdown)
      setToggleBaseCurrencyDropdown(!toggleBaseCurrencyDropdown);

    if (!toggleBaseCurrencyDropdown) setToggleBaseCurrencyDropdown(true);
  };

  const handleToggleTargetCurrency = (): void => {
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

  const completedConversion = !!(
    userAmount &&
    targetCurrency &&
    fee &&
    amountMinusFee &&
    Object.keys(rates).length > 0 &&
    rate &&
    convertedAmount
  );

  const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();

    const { userAmount, convertedAmount } = payoutDetails;

    const formState = {
      userAmount,
      convertedAmount,
    };

    const keys = Object.keys(formState);
    const errors = validateFormData(formState, keys);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    handleProceed();
  };

  return (
    <div className="card">
      <div className="container mb-5">
        <h3 className="card-heading__primary">One-time Payout</h3>
        <p className="card-heading__secondary">Send money internationally</p>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className={classes.formGroup(completedConversion)}>
          <label htmlFor="userAmount" className="label--inset">
            You send
          </label>
          <input
            name="userAmount"
            type="text"
            onChange={(e) => {
              if (isNaN(parseInt(e.target.value))) {
                setValidationErrors({
                  userAmount: {
                    error: true,
                    text: "userAmount is invalid",
                  },
                });
              } else {
                delete validationErrors.userAmount;

                handleChangeWithDebounce(e);
              }
            }}
            className={classes.input(
              validationErrors.userAmount && validationErrors.userAmount.error
            )}
          ></input>
          <ul className="dropdown__container">
            <li
              role="button"
              aria-labelledby="dropdown-label"
              className="dropdown__toggle"
              data-id="baseCurrency"
              onClick={() => handleToggleBaseCurrency()}
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
            {/* The fixer free plan's latest rates endpoint only allows for one base currency */}
            {/* <li
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
                    handleToggleBaseCurrency();
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
            </li> */}
          </ul>
        </div>
        {completedConversion && (
          <div className="container">
            <div className="container pl-[18px]">
              <div className="flex py-[10px] border-l-2 border-solid border-white-detail">
                <span className="relative right-[11px] leading-[20px] inline-block w-5 h-5 rounded-xl text-center text-grey-label bg-white-detail">
                  -
                </span>
                <p className="mx-1 sm:mx-4 text-sm leading-6 text-grey-label">
                  {payoutDetails.fee} {payoutDetails.baseCurrency}
                </p>
                <p className="text-[13px] sm:text-sm leading-6 text-grey-label">
                  Transfer fee
                </p>
              </div>
            </div>
            <div className="container pl-[18px]">
              <div className="flex py-[10px] border-l-2 border-solid border-white-detail">
                <span className="relative right-[11px] leading-[20px] inline-block w-5 h-5 rounded-xl text-center text-grey-label bg-white-detail">
                  =
                </span>
                <p className="mx-1 sm:mx-4 text-sm leading-6 text-grey-label">
                  {payoutDetails.amountMinusFee} {payoutDetails.baseCurrency}
                </p>
                <p className="text-[13px] sm:text-sm leading-6 text-grey-label">
                  Amount we’ll convert
                </p>
              </div>
            </div>
            <div className="container pl-[18px]">
              <div className="flex py-[10px] border-l-2 border-solid border-white-detail">
                <span className="relative leading-[20px] right-[11px] inline-block w-5 h-5 rounded-xl text-center text-grey-label bg-white-detail">
                  x
                </span>
                <p className="mx-1 sm:mx-4 text-sm leading-6 text-blue-bold">
                  {payoutDetails.rate} {payoutDetails.baseCurrency}
                </p>
                <p className="text-[13px] sm:text-sm text-sm leading-6 font-medium text-blue-bold">
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
            className={classes.input(
              validationErrors.convertedAmount &&
                validationErrors.convertedAmount.error
            )}
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
                    handleToggleTargetCurrency();
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
                    handleToggleTargetCurrency();
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
                    handleToggleTargetCurrency();
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
                    handleToggleTargetCurrency();
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
