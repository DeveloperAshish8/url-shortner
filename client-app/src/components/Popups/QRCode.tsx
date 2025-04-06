import * as React from "react";
import { QRCodeSVG } from "qrcode.react";

interface IQRCodeProps {
  link: string;
  setQROpened: Function;
}

const QRCode: React.FunctionComponent<IQRCodeProps> = ({
  link,
  setQROpened,
}) => {
  return (
    <div
      className="fixed inset-0 w-full  bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        e.preventDefault();
        setQROpened(false);
      }}
    >
      <div className="w-[400px] h-[400px] flex justify-center items-center border border-gray-500 rounded-2xl bg-[#0B101B]">
        <QRCodeSVG
          value={link}
          fgColor="#ffffff"
          bgColor="#0B101B"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default QRCode;
