import gbp from "../../assets/images/gbr.svg";
import ngn from "../../assets/images/ngr.svg";
import eur from "../../assets/images/eur.svg";
import usd from "../../assets/images/usd.svg";

const mapCurrencyToFlag = (currency: string): string => {
  const formattedCurrency = currency.toLowerCase();

  switch (formattedCurrency) {
    case "eur":
      return eur;
    case "ngr":
      return ngn;
    case "gbp":
      return gbp;
    case "usd":
      return usd;
    default:
      return ngn;
  }
};

export default mapCurrencyToFlag;
