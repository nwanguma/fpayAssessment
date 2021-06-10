import { Link } from "react-router-dom";

import ErrorTemplate from "../templates/ErrorTemplate";

import notFound from "../assets/images/503.png";
import refresh from "../assets/images/ArrowsCounterClockwise.svg";
import clock from "../assets/images/Clock.svg";
import email from "../assets/images/EnvelopeSimple.svg";

const Unavailable: React.FC = () => {
  return (
    <ErrorTemplate image={notFound}>
      <div className="container" data-testid="container">
        <h2 className="text-[72px] leading-[90px] text-grey-large font-black">
          503
        </h2>
        <h3 className="mt-1 md:mt-3 text-[24px] leading-[30px] text-blue-black font-bold">
          Well, this is embarassing...
        </h3>
        <p className="mt-2 md:mt-3 text-[16px] leading-[24px] text-grey-text">
          Sorry this is not working properly. We know about this mistake and
          we’re working to fix it.
        </p>
        <p className="mt-2 md:mt-3 text-[16px] leading-[24px] text-grey-text">
          In the meantime, here’s what you can do:
        </p>
        <p className="mt-1 md:mt-3 flex px-3 items-center">
          <img
            className="w-[15px] h-[15px] inline-block mr-2"
            src={refresh}
            alt=""
          />
          <span className="text-[16px] leading-[24px] text-grey-text">
            Refresh the page (sometimes this helps).
          </span>
        </p>
        <p className="mt-1 md:mt-3 flex px-3 items-center">
          <img
            className="w-[15px] h-[15px] inline-block mr-2"
            src={clock}
            alt=""
          />
          <span className="text-[16px] leading-[24px] text-grey-text">
            Try again in 30 minutes.
          </span>
        </p>
        <p className="mt-1 md:mt-3 flex px-3 items-center">
          <img
            className="w-[15px] h-[15px] inline-block mr-2"
            src={email}
            alt=""
          />
          <span className="text-[16px] leading-[24px] text-grey-text">
            Email us at{" "}
            <span className="text-blue-tab">support@fliqpay.com</span> if this
            persists.
          </span>
        </p>
        <Link
          to="/"
          className="flex items-center mx-auto md:-mx-0 justify-center leading-[40px] h-[40px] w-[172px] bg-blue-tab text-white-main btn mt-8"
        >
          Refresh Page
        </Link>
      </div>
    </ErrorTemplate>
  );
};

export default Unavailable;
