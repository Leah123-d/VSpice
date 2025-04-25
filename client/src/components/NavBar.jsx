import { House, SquarePlus, ShoppingBasket } from "lucide-react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <div
        id="hs-sidebar-basic-usage"
        className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64
              hs-overlay-open:translate-x-0
              -translate-x-full transition-all duration-300 transform
              h-full
              hidden
              fixed top-0 start-0 bottom-0 z-60
             bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700"
        role="dialog"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full ">
          <header className="p-4 flex justify-between items-center gap-x-2">
            <a
              className=" active flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 dark:text-white"
              aria-label="Title"
            >
              Welcome to VSpice!
            </a>
          </header>

          <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div className=" pb-0 px-2  w-full flex flex-col flex-wrap">
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to="/"
                    end
                    className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white"
                  >
                    <House />
                    Spice Cabinet
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/create"
                    className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200"
                  >
                    <SquarePlus />
                    Create new Spice
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="shopping"
                    className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200"
                  >
                    <ShoppingBasket />
                    Shopping Lists
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
