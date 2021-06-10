import { Link } from "react-router-dom";

import ErrorTemplate from "../templates/ErrorTemplate";

import notFound from "../assets/images/404.png";

const NotFound: React.FC = () => {
  return (
    <ErrorTemplate image={notFound}>
      <div className="container" data-testid="container">
        <h2 className="text-[72px] leading-[90px] text-grey-large font-black">
          404
        </h2>
        <h3 className="mt-1 text-[24px] leading-[30px] text-blue-black font-bold">
          Hmm, we couldn’t find that page.
        </h3>
        <p className="mt-2 text-[16px] leading-[24px] text-grey-text">
          No worries - we can still get you where you need to go. Our homepage
          is a good place to start.
        </p>
        <Link
          to="/"
          className="flex items-center mx-auto md:-mx-0 justify-center leading-[40px] h-[40px] w-[172px] bg-blue-tab text-white-main btn mt-8"
        >
          Home
        </Link>
      </div>
    </ErrorTemplate>
  );
};

export default NotFound;
