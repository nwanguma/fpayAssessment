import { Link } from "react-router-dom";

import ErrorTemplate from "../templates/ErrorTemplate";

import notFound from "../assets/images/503.png";

const Glitch: React.FC = () => {
  return (
    <ErrorTemplate image={notFound}>
      <div className="container">
        <h2 className="text-[72px] leading-[90px] text-grey-large font-black">
          500
        </h2>
        <h3 className="mt-1 md:mt-3 text-[24px] leading-[30px] text-blue-black font-bold">
          There’s been a glitch…
        </h3>
        <p className="mt-2 md:mt-3 text-[16px] leading-[24px] text-grey-text">
          An error has occurred and we’re working to fix the problem! We’ll be
          up and running shortly
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

export default Glitch;
