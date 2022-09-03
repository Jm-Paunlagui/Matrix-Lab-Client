import React, { useState } from "react";

import { AiFillHome } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { MdLeaderboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { TbDeviceAnalytics } from "react-icons/tb";
import { Transition } from "@headlessui/react";
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @type {React.FC<{}>}
 * @description Navbar component with useful links
 */
function Navbar () {
  /**
   * @type {boolean}
   * @description Hook to handle the state of the show and hide password
   * @param navbarOpen - initial state of the navbar
   * @param setNavbarOpen - setter of the state of the navbar
   */
  const [navbarOpen, setNavbarOpen] = useState(false);

  /**
   * @type {string}
   * @description Gets the access token from local storage
   */
  const tokenAuth = localStorage.getItem("access_token");
  // check the length of the token

  /**
   * @description Navbar icon toggle function if the user is logged in or not
   * @default {FaSignInAlt}
   */
  const navIcon = tokenAuth ? (
    <TbDeviceAnalytics size={24} title="Dashboard" />
  ) : (
    <FaSignInAlt size={24} title="Sign-in" />
  );

  /**
   * @description designated link for the user to go to the dashboard
   * @default {/auth}
   */
  const link = tokenAuth ? "/admin" : "/auth";

  return (
    <nav className="fixed top-0 flex flex-wrap items-center justify-between w-full p-1 shadow-md backdrop-blur-xl bg-white/50 font-Montserrat">
      <div className="container flex flex-wrap items-center justify-between mx-auto max-w-7xl">
        <div className="flex justify-between w-full md:w-auto lg:static md:block md:justify-start">
          <NavLink to="/">
            <div className="flex items-center px-3 py-2 text-gray-900 rounded-md hover:text-blue-900">
              <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
              <h1 className="ml-3 font-bold tracking-widest transition-colors duration-300 ease-in-out delay-150 text-md md:flex">
                MATRIX LAB
              </h1>
            </div>
          </NavLink>
          <button
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="block px-3 py-1 text-xl leading-none transition-colors duration-300 ease-in-out delay-150 bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer md:hidden focus:outline-none"
          >
            <GoThreeBars color="#374151" />
          </button>
        </div>
        <div
          className={`md:flex flex-grow items-center  lg:bg-opacity-0 lg:shadow-none ${
            navbarOpen ? " block" : " hidden"
          }`}
        >
          <Transition
            show={navbarOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <ul className="flex flex-col justify-start list-none md:flex-row md:ml-auto">
              <NavLink to="/">
                <li className="flex items-center px-8 py-4 text-gray-700 transition-colors duration-300 ease-in-out delay-150 hover:text-blue-900">
                  <AiFillHome size={24} title="Home" />
                  <h1 className="block px-8 text-sm font-medium tracking-wider blockml-3 md:hidden">
                    Home
                  </h1>
                </li>
              </NavLink>
              <NavLink to="leaderboard">
                <li className="flex items-center px-8 py-4 text-gray-700 transition-colors duration-300 ease-in-out delay-150 hover:text-blue-900">
                  <MdLeaderboard size={24} title="Leaderboard" />
                  <div className="block px-8 text-sm font-medium tracking-wider blockml-3 md:hidden">
                    Leaderboard
                  </div>
                </li>
              </NavLink>
              <NavLink to={link}>
                <li className="flex items-center px-8 py-4 text-gray-700 transition-colors duration-300 ease-in-out delay-150 hover:text-blue-900">
                  {navIcon}
                  <div className="block px-8 text-sm font-medium tracking-wider blockml-3 md:hidden">
                    {tokenAuth ? "Dashboard" : "Sign-in"}
                  </div>
                </li>
              </NavLink>
            </ul>
          </Transition>
          <ul className="flex-col justify-start hidden list-none md:flex md:flex-row md:ml-auto">
            <NavLink to="/">
              <li className="flex items-center px-8 py-4 text-gray-700 transition-colors duration-300 ease-in-out delay-150 hover:text-blue-900">
                <AiFillHome size={24} title="Home" />
                <h1 className="block px-8 text-sm font-medium tracking-wider blockml-3 md:hidden">
                  Home
                </h1>
              </li>
            </NavLink>
            <NavLink to="leaderboard">
              <li className="flex items-center px-8 py-4 text-gray-700 transition-colors duration-300 ease-in-out delay-150 hover:text-blue-900">
                <MdLeaderboard size={24} title="Leaderboard" />
                <div className="block px-8 text-sm font-medium tracking-wider blockml-3 md:hidden">
                  Leaderboard
                </div>
              </li>
            </NavLink>
            <NavLink to={link}>
              <li className="flex items-center px-8 py-4 text-gray-700 transition-colors duration-300 ease-in-out delay-150 hover:text-blue-900">
                {navIcon}
                <div className="block px-8 text-sm font-medium tracking-wider blockml-3 md:hidden">
                  {tokenAuth ? "Dashboard" : "Sign-in"}
                </div>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
