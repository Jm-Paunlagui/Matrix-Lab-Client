import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";

import { AiFillHome } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import React from "react";
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @description Navigation bar array of objects for the navigation bar links
 */
const NavigationBarlinks = [
    {
        name: "Home",
        icon: <AiFillHome />,
        link: "/",
    },
    {
        name: "Leaderboard",
        icon: <MdLeaderboard />,
        link: "/leaderboard",
    },
    {
        name: "Sign In",
        icon: <FaSignInAlt />,
        link: "/auth",
    }
]

/**
 * @description NavigationBar component with useful links
 */
export default function NavigationBar() {
  return (
    <Menu
      as={"nav"}
      className="fixed top-0 flex flex-wrap items-center justify-between w-full p-1 shadow-md backdrop-blur-xl bg-white/50 font-Montserrat"
    >
      {({ open }) => (
        <div className="container flex flex-wrap items-center justify-between mx-auto max-w-7xl">
          <div className="flex justify-between w-full md:w-auto lg:static md:block md:justify-start">
            <NavLink to="/">
              <div className="flex items-center px-3 py-2 text-gray-900 transition duration-300 ease-in-out delay-150 rounded-md hover:text-blue-900">
                <img src={logo} alt="logo" className="w-10 h-10" />
                <h1 className="ml-2 text-xl font-bold tracking-widest transition-colors duration-300 ease-in-out delay-150 md:text-3xl md:flex">
                  MATRIX LAB
                </h1>
              </div>
            </NavLink>
            <Menu.Button className="block px-3 py-1 text-base leading-none transition-colors duration-300 ease-in-out delay-150 bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer md:hidden focus:outline-none">
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XMarkIcon className="block w-6 h-6 " aria-hidden="true" />
              ) : (
                <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
              )}
            </Menu.Button>
          </div>
          <Menu
            as={"div"}
            className={`md:flex flex-grow items-center  lg:bg-opacity-0 lg:shadow-none ${
              open ? " block" : " hidden"
            }`}
          >
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <ul className="flex flex-col justify-start list-none md:flex-row md:ml-auto">
                {NavigationBarlinks.map((link) => (
                  <NavLink to={link.link} key={link.name}>
                    <li className="flex items-center px-8 py-4 text-gray-700 transition-colors duration-300 ease-in-out delay-150 hover:text-blue-900">
                      {/*<AiFillHome size={24} title="PublicHome" />*/}
                      <h1 className="block px-8 ml-3 text-sm font-medium tracking-wider md:hidden">
                        {link.name}
                      </h1>
                    </li>
                  </NavLink>
                ))}
              </ul>
            </Transition>
            <ul className="flex-col justify-start hidden list-none md:flex md:flex-row md:ml-auto">
              {NavigationBarlinks.map((link) => (
                  <NavLink to={link.link} key={link.name}>
                    <li className="flex items-center px-4 py-4 text-gray-700 transition-colors duration-300 ease-in-out delay-150 hover:text-blue-900">
                      {/*<AiFillHome size={24} title="PublicHome" />*/}
                      <h1 className="block ml-3 text-sm font-medium tracking-wider">
                        {link.name}
                      </h1>
                    </li>
                  </NavLink>
              ))}
            </ul>
          </Menu>
        </div>
      )}
    </Menu>
  );
}
