import { UPDATE_DETAILS } from "../../utils/types";

export interface State {
  userAmount: string;
  feeRate: number;
  fee: number;
  amountMinusFee: number;
  baseCurrency: string;
  rates: { [key: string]: string };
  rate: number;
  targetCurrency: string;
  convertedAmount: string;
  fullname: string;
  mail: string;
  accountNumber: string;
  swiftCode: string;
}

export interface Action {
  type: string;
  payload: Object;
}

export const initialState: State = {
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

const payoutReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case UPDATE_DETAILS:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default payoutReducer;
