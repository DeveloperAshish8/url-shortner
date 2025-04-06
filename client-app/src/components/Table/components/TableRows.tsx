import * as React from "react";
import { BsQrCode } from "react-icons/bs";
import { GoCopy } from "react-icons/go";
import QRCode from "../../Popups/QRCode";
import { MdDelete } from "react-icons/md";
import { handleRedirect } from "../../../utils/api/RedirectToOriginal";
import { deleteLink } from "../../../utils/api/DeleteLink";
import { FaAngleDown } from "react-icons/fa";
import { HiMiniQrCode } from "react-icons/hi2";

interface LinkData {
  fullUrl: string;
  clicks: number;
  _id: string;
  shortUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ITableRowsProps {
  data: LinkData;
  setRefresh: Function;
}

const TableRows: React.FunctionComponent<ITableRowsProps> = ({
  data,
  setRefresh,
}) => {
  const [qrOpened, setQROpened] = React.useState(false);
  const [dropdown, setDropdown] = React.useState(false);
  const copylink = () => {
    navigator.clipboard.writeText(
      "http://localhost:5000/api/shortUrl/" + data.shortUrl
    );
  };
  const redirect = async () => {
    setRefresh((prev: boolean) => !prev);
    await handleRedirect(data.shortUrl);
  };

  const deleteUrl = async (url: string) => {
    await deleteLink(url);
    setRefresh((prev: boolean) => !prev);
  };

  return (
    <>
      <div className="md:w-[1300px] w-full h-10 md:flex hidden  items-center text-[#c9ced6] bg-[#181E29] text-base font-medium px-3 py-2">
        <div className="w-[300px] flex items-center gap-3 cursor-pointer">
          <h3 onClick={redirect}> linkly.com/{data?.shortUrl} </h3>
          <GoCopy onClick={copylink} className="" />
        </div>
        <h6 className="w-[450px] overflow-hidden text-ellipsis whitespace-nowrap">
          {data?.fullUrl}
        </h6>
        <h6 className="w-[100px]">
          <BsQrCode className="w-5 h-5" onClick={() => setQROpened(true)} />
        </h6>
        <h6 className="w-[150px]">{data.clicks}</h6>
        <h6 className="w-[200px]">
          {new Date(data?.createdAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }) +
            " | " +
            new Date(data?.createdAt)
              .toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })
              .toUpperCase()}
        </h6>
        <h6 className="w-[100px]">
          <MdDelete
            className="w-5 h-5 cursor-pointer"
            onClick={() => deleteUrl(data._id)}
          />
        </h6>

        {qrOpened && <QRCode link={data.shortUrl} setQROpened={setQROpened} />}
      </div>
      <div className="w-full md:hidden relative flex flex-col gap-2 justify-center items-center text-[#c9ced6] bg-[#181E29] text-base font-medium px-5 py-3">
        <div className="w-[300px] flex items-center gap-3 cursor-pointer">
          <h3 onClick={redirect}> linkly.com/{data?.shortUrl} </h3>
          <GoCopy onClick={copylink} className="" />
        </div>
        <div
          className="absolute flex w-10 h-10 right-2 top-1 items-center cursor-pointer justify-center bg-gray-800 text-[#c9ced6] rounded-full"
          onClick={() => setDropdown((prev) => !prev)}
        >
          <FaAngleDown className="w-6 h-6 font-light" />
        </div>
        <h6 className=" absolute right-16 top-1 flex w-10 h-10 items-center cursor-pointer justify-center bg-gray-800 text-[#c9ced6] rounded-full">
          <MdDelete
            className="w-6 h-6 font-light"
            onClick={() => deleteUrl(data._id)}
          />
        </h6>
        <div className={`${dropdown ? "flex" : "hidden"} flex-col gap-2`}>
          <div className="flex items-center gap-2 justify-center h-7 ">
            <h6 className=" bg-white p-1 rounded-md cursor-pointer">
              <HiMiniQrCode
                className="w-4 h-4 text-black"
                onClick={() => setQROpened(true)}
              />
            </h6>
            <h6 className="w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
              {data?.fullUrl}
            </h6>
          </div>
          <h6 className="w-[150px]">Clicks: {data.clicks}</h6>
          <h6 className="w-[200px]">
            {new Date(data?.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }) +
              " | " +
              new Date(data?.createdAt)
                .toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
                .toUpperCase()}
          </h6>
        </div>

        {qrOpened && <QRCode link={data.shortUrl} setQROpened={setQROpened} />}
      </div>
    </>
  );
};

export default TableRows;
