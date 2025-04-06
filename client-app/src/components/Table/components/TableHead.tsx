import * as React from "react";

interface ITableHeadProps {}

const TableHead: React.FunctionComponent<ITableHeadProps> = () => {
  return (
    <div className="w-full flex items-center text-white bg-[#181E29] text-base font-semibold px-5 py-3 rounded-t-xl">
      <h3 className="w-[300px]">Shorten Links</h3>
      <div className="md:flex gap-0 hidden">
        <h3 className="w-[450px]">Original Link</h3>
        <h3 className="w-[100px]">QR Code</h3>
        <h3 className="w-[150px]">Clicks</h3>
        <h3 className="w-[200px]">Date</h3>
        <h6 className="w-[100px]">Action</h6>
      </div>
    </div>
  );
};

export default TableHead;
