import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { NavLink, useLocation } from "react-router-dom";
import React, { Fragment } from "react";

import logo from "../../assets/img/android-chrome-192x192.png";

export default function AdminNavigationBar() {
  /**
   * @description Navigation bar array of objects for the navigation bar links
   * @type {Location}
   */
  const location = useLocation();

  /**
   * @description Destructure the location object to get the pathname
   */
  const { pathname } = location;

  /**
   * @description Javascript split method to get the first part of the pathname.
   */
  const splitLocation = pathname.split("/");

  /**
   * @description Handles the link if it is active or not.
   * @param link
   * @returns {boolean}
   */
  function isActive(link) {
    return splitLocation[2] === link;
  }

  /**
   * @description Handles the navigation bar for the admin pages
   * @type {[{current: boolean, name: string, href: string},{current: boolean, name: string, href: string},{current: boolean, name: string, href: string},{current: boolean, name: string, href: string},{current: boolean, name: string, href: string}]}
   */
  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      current: isActive("dashboard"),
    },
    {
      name: "Management",
      href: "/admin/management",
      current: isActive("management"),
    },
    {
      name: "Analyze",
      href: "/admin/analyze",
      current: isActive("analyze"),
    },
    {
      name: "Leaderboard",
      href: "/admin/leaderboard/departments",
      current: isActive("leaderboard"),
    },
  ];

  /**
   * @description Handles the profile menu for the admin pages
   * @type {[{name: string, href: string},{name: string, href: string}, {name: string, href: string}]}
   */
  const user_controllers = [
    {
      name: "Your Profile",
      href: "/admin/profile",
      current: isActive("profile"),
    },
    {
      name: "Sign out",
      href: "admin/logout",
      current: isActive("logout"),
    },
  ];
  return (
    <Menu
      as="nav"
      className="fixed top-0 z-50 w-full shadow-md backdrop-blur-xl bg-white/50 font-Montserrat"
    >
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Menu.Button className="inline-flex items-center justify-center p-2 text-gray-500 rounded-md hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Menu.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch lg:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <img
                    className="block w-auto h-8 md:hidden"
                    src={logo}
                    alt="Your Company"
                  />
                  <img
                    className="hidden w-auto h-8 md:block"
                    src={logo}
                    alt="Your Company"
                  />
                </div>

                <div className="hidden sm:ml-6 lg:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink key={item.name} to={item.href}>
                        <h5
                          className={`${
                            item.current
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                              : "hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500"
                          } block px-3 py-2 text-base font-medium`}
                        >
                          {item.name}
                        </h5>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 inset-auto right-0 flex items-center ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button
                      className={`flex text-sm rounded ${
                        isActive("profile")
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-bold"
                          : "hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500"
                      }`}
                    >
                      <span className="sr-only">Open user menu</span>
                      <h1 className="text-base font-medium">johnpaunlagui</h1>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink to={user_controllers[0].href}>
                            <h5
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              {user_controllers[0].name}
                            </h5>
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink to={user_controllers[1].href}>
                            <h5
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              {user_controllers[1].name}
                            </h5>
                          </NavLink>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink key={item.name} to={item.href}>
                  <h5
                    className={`${
                      item.current
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        : "hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500"
                    } block px-3 py-2 text-base font-medium`}
                  >
                    {item.name}
                  </h5>
                </NavLink>
              ))}
            </div>
          </Transition>
        </>
      )}
    </Menu>
  );
}
