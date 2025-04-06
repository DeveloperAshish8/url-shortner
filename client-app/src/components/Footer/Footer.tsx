import * as React from "react";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <div className="w-full flex justify-center items-center  text-white text-base text-center absolute bottom-0">
      Copyright &#169; URLShortner | Ashish Kumar
    </div>
  );
};

export default Footer;
