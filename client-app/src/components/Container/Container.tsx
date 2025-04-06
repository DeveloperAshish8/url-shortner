import * as React from "react";
import { FiLink } from "react-icons/fi";
import SavedLinks from "../Table/SavedLinks";
import { shortenLink } from "../../utils/api/ShortenLink";
import { FaArrowRight } from "react-icons/fa";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const form = React.useRef<HTMLFormElement>(null);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const shortenButton = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    const url = form.current.elements.namedItem("url") as HTMLInputElement;
    if (!url.value) {
      return;
    }

    await shortenLink(url.value);
    setRefresh((prev) => !prev);
    form.current.reset();
  };
  return (
    <div className="flex justify-center items-center w-full flex-col gap-8 px-4">
      <div className="flex flex-col items-center justify-center mt-20 md:w-[1300px] w-full gap-6 text-center">
        <h2 className="md:text-[64px] text-4xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-transparent bg-clip-text leading-[1.5]">
          Shorten Your Loooong Links :)
        </h2>
        <p className="md:text-lg text-base font-medium md:w-[650px] w-[340px] text-[#c9ced6] leading-[180%]">
          Linkly is an efficient and easy to use URL Shortening service that
          streamlines your online experience
        </p>
        <form
          ref={form}
          onSubmit={shortenButton}
          className="flex justify-between items-center md:w-[700px] w-full h-14 rounded-full border-2 border-[#6f6f6f] p-1 text-[#c9ced6]"
        >
          <div className="flex gap-3 items-center  px-3 py-2 font-medium justify-center">
            <FiLink />
            <input
              type="text"
              name="url"
              placeholder="Enter the link here"
              className="md:w-[400px] w-[220px] bg-transparent outline-none "
            />
          </div>
          <button
            type="submit"
            className="md:w-[160px] md:h-full w-12 h-12 rounded-full flex items-center justify-center  bg-[#144EE3] text-white"
          >
            <span className="hidden md:inline">Shorten Now!</span>

            {/* Show on mobile */}
            <span className="md:hidden">
              <FaArrowRight />
            </span>
          </button>
        </form>
      </div>
      <SavedLinks refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
};

export default Container;
