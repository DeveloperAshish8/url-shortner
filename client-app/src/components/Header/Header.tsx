import * as React from "react";
import { LuLogOut } from "react-icons/lu";
import { Logout } from "../../utils/api/Logout";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const logout = async () => {
    await Logout();
  };

  return (
    <div className="bg-slate-900" onMouseLeave={() => setShowMenu(false)}>
      <div className="container p-2 mx-auto">
        <nav className="p-5 flex items-center justify-between w-full">
          <div className=" text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text leading-[1.0]">
            URL Shortner
          </div>

          <div
            className=""
            onMouseEnter={() => {
              setShowMenu(true);
            }}
          >
            <div
              className="flex items-center space-x-2 text-sm cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            >
              <div className="w-10 h-10 bg-[#FFC96B] rounded-full flex items-center font-semibold justify-center text-[#3D2800] ">
                U
              </div>
            </div>

            {showMenu && (
              <div
                className="absolute w-[200px] p-2 bg-gray-600 rounded-lg top-[60px] right-5 shadow-lg"
                onClick={(e) => e.stopPropagation()} // Prevent click propagation
              >
                <div className="flex flex-col text-sm">
                  <div
                    className="flex items-center gap-4 py-[10px] px-2 w-[184px] cursor-pointer hover:bg-gray-400 rounded-md"
                    onClick={() => {
                      logout();
                      setShowMenu(false); // Close menu on logout click
                    }}
                  >
                    <LuLogOut className="w-6 h-6" /> Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
