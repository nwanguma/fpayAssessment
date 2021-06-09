import { UPDATE_DETAILS } from "../../utils/types";

export const initialState = {
  userAmount: "",
  feeRate: 0.00369,
  fee: "",
  amountMinusFee: "",
  baseCurrency: "EUR",
  rates: {},
  rate: "",
  targetCurrency: "NGN",
  convertedAmount: "",
  name: "",
  email: "",
  accountNumber: "",
  swiftCode: "",
};

const payoutReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_DETAILS:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default payoutReducer;
