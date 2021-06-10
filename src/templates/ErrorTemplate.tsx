import { Link } from "react-router-dom";

import logo from "../assets/images/logo.svg";

interface IProps {
  children: JSX.Element;
  image: string;
}

const ErrorTemplate: React.FC<IProps> = ({ children, image }) => {
  return (
    <div className="wrapper">
      <header className="header--payout w-[100%] md:w-[90%] mx-auto flex items-center py-6 justify-between">
        <Link to="/">
          <img src={logo} alt="fliqpay" />
        </Link>
      </header>
      <main className="container min-h-[80vh] min-w-full flex items-center">
        <div className="container flex flex-col-reverse  md:flex-row justify-center md:justify-between items-center max-w-[400px] md:text-left md:max-w-[80%] mx-auto">
          <div className="container mt-3 flex-item w-[90%] text-center md:text-left">
            {children}
          </div>
          <div className="container mx-auto md:mx-0 w-[250px] h-[150px] md:w-[350px] md:h-[250px]">
            <img className="w-[100%] h-[100%]" src={image} alt="error pic" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorTemplate;
