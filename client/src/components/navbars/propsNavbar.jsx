import React, { useState } from "react";

import { GoThreeBars } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { Transition } from "@headlessui/react";

function Navbar({ main, logo, title, navitems }) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed top-0 flex flex-wrap items-center justify-between w-full p-1 shadow-md backdrop-blur-xl bg-white/50 font-Montserrat">
      <div className="container flex flex-wrap items-center justify-between mx-auto max-w-7xl">
        <div className="flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
          {/* Props */}
          <NavLink
            to={main}
            className="flex items-center px-3 py-2 text-gray-900 rounded-md hover:text-blue-900"
          >
            <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
            <h1 className="hidden ml-3 font-bold tracking-widest text-md md:flex">
              {title}
            </h1>
            <h1 className="ml-3 font-bold tracking-widest text-md md:hidden">
              {title}
            </h1>
          </NavLink>
          {/* Button for mobile view */}
          <button
            className="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <GoThreeBars color="#374151" />
          </button>
        </div>
        <Transition
          show={navbarOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div
            className={`lg:flex flex-grow items-center lg:bg-opacity-0 lg:shadow-none`}
          >
            <ul className="flex flex-col justify-start list-none lg:flex-row lg:ml-auto">
              {/* Props */}
              {navitems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center px-8 py-4 hover:text-blue-900"
                >
                  <NavLink
                    to={item.link}
                    className="flex items-center px-3 py-2 text-gray-900 rounded-md hover:text-blue-900"
                  >
                    <div className="block px-8 ml-3 text-sm font-medium tracking-wider">
                      {item.titlel}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </Transition>
        <div
          className={`hidden lg:flex flex-grow items-center lg:bg-opacity-0 lg:shadow-none`}
        >
          <ul className="flex flex-col justify-start list-none lg:flex-row lg:ml-auto">
            {/* Props */}
            {navitems.map((item) => (
              <li
                key={item.id}
                className="flex items-center px-4 py-4 hover:text-blue-900"
              >
                <NavLink
                  to={item.link}
                  className="flex items-center px-3 py-2 text-gray-900 rounded-md hover:text-blue-900"
                >
                  <div className="block text-sm font-medium tracking-wider">
                    {item.titlel}
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
