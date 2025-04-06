import * as React from "react";
import TableHead from "./components/TableHead";
import TableRows from "./components/TableRows";
import { GetAllLinks } from "../../utils/api/GetAllLinks";

interface ISavedLinksProps {
  refresh: boolean;
  setRefresh: Function;
}
interface LinkData {
  fullUrl: string;
  clicks: number;
  _id: string;
  shortUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const SavedLinks: React.FunctionComponent<ISavedLinksProps> = ({
  refresh,
  setRefresh,
}) => {
  const [links, setLinks] = React.useState<LinkData[]>([]);

  React.useEffect(() => {
    const allLinks = async () => {
      const data = await GetAllLinks();
      if (data) setLinks(data);
    };
    allLinks();
  }, [refresh]);
  return (
    <div className="md:w-[1300px] w-full flex flex-col gap-1 mb-8">
      <TableHead />
      <div className="w-full flex flex-col gap-1 ">
        {links.length > 0 ? (
          links.map((link, index) => (
            <TableRows key={index} data={link} setRefresh={setRefresh} />
          ))
        ) : (
          <p className="text-center text-gray-400 mt-4">No links found.</p>
        )}
      </div>
    </div>
  );
};

export default SavedLinks;
