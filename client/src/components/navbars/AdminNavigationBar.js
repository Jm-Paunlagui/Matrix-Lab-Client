import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { NavLink, useLocation } from "react-router-dom";
import React, { Fragment } from "react";

import logo from "../../assets/img/android-chrome-192x192.png";
import httpClient from "../../http/httpClient";
import { isAuth, signout } from "../../helpers/Auth";
import {BsAwardFill} from "react-icons/bs";

/**
 * @description Handles the admin navigation bar for the application
 */
export default function AdminNavigationBar() {
  /**
   * @description Gets the user data from the Auth helper
   */
  const user = isAuth();

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

  function isActiveSubs(link) {
    return splitLocation[3] === link;
  }

  /**
   * @description Handles the logout of the user
   * @returns {Promise<void>}
   */
  const logoutUser = async () => {
    await httpClient.post("/user/sign-out");
    setTimeout(() => {
      window.location.href = "/";
    }, 2100);
    signout();
  };

  /**
   * @description Handles the navigation bar for the admin pages
   * @type {[{current: boolean, name: string, href: string},{current: boolean, name: string, href: string},{current: boolean, name: string, href: string},{current: boolean, name: string, href: string}]}
   */
  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      current: isActive("dashboard"),
    },
    // {
    //   name: "Management",
    //   href: "/admin/management/files",
    //   current: isActive("management"),
    // },
    {
      name: "Analyze",
      href: "/admin/analyze",
      current: isActive("analyze"),
    },
    // {
    //   name: "Insights",
    //   href: "/admin/insights/departments",
    //   current: isActive("insights"),
    // },
  ];

  /**
   * @description Handles the profile menu for the admin pages
   * @type {[{current: boolean, name: string, href: string},{current: boolean, name: string, href: string}]}
   */
  const admin_controllers = [
    {
      name: "Your Profile",
      href: `/admin/profile/${user.username}`,
      current: isActive("profile"),
    },
    {
      name: "Sign out",
      href: "logout",
      current: isActive("logout"),
    },
  ];

  const navigation_for_insights = [
    {
      name: "Department",
      href: "/admin/insights/departments",
      current: isActiveSubs("departments"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
    },
    {
      name: "Employee",
      href: "/admin/insights/employees",
      current: isActiveSubs("employees"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
    },
    {
      name: "Per Semester Department",
      href: "/admin/insights/per-semester-department",
      current: isActiveSubs("per-semester-department"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
    },
    {
      name: "Per Semester Employee",
      href: "/admin/insights/per-semester-employee",
      current: isActiveSubs("per-semester-employee"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
    },
  ];

  /**
   * @description Handles the navigation bar for the admin pages
   * @type {[{current: boolean, name: string, href: string}]}
   */
  const navigation_for_management = [
    {
      name: "Files",
      href: "/admin/management/files",
      current: isActiveSubs("files"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
    },
    {
      name: "Professors",
      href: "/admin/management/professors",
      current: isActiveSubs("professors"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
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
                    <XMarkIcon aria-hidden="true" className="block w-6 h-6" />
                  ) : (
                    <Bars3Icon aria-hidden="true" className="block w-6 h-6" />
                  )}
                </Menu.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch lg:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <img
                    alt="Your Company"
                    className="block w-auto h-10 md:hidden"
                    src={logo}
                  />
                  <img
                    alt="Your Company"
                    className="hidden w-auto h-10 md:block"
                    src={logo}
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
                    <div className="block px-3 py-2 text-base font-medium">
                      <Menu as="div" className="relative">
                        <div>
                          <Menu.Button
                              className={`flex text-sm rounded ${
                                  isActive("management")
                                      ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-bold"
                                      : "hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500"
                              }`}
                          >
                            <h1 className="text-base font-medium">Data Management</h1>
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
                          <Menu.Items className="absolute right-0 z-10 w-60 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {navigation_for_management.map((item) => (
                                <Menu.Item key={item.name}>
                                  <NavLink to={item.href} >
                                    <h5
                                        className={`${
                                            item.current
                                                ? "z-50 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                                : "hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500"
                                        } block px-4 py-2 text-sm text-gray-700`}
                                    >
                                      {item.name}
                                    </h5>
                                  </NavLink>

                                </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    <div className="block px-3 py-2 text-base font-medium">
                      <Menu as="div" className="relative">
                        <div>
                          <Menu.Button
                              className={`flex text-sm rounded ${
                                  isActive("insights")
                                      ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-bold"
                                      : "hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500"
                              }`}
                          >
                            <h1 className="text-base font-medium">Insights</h1>
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
                          <Menu.Items className="absolute right-0 z-10 w-60 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {navigation_for_insights.map((item) => (
                                <Menu.Item key={item.name}>
                                      <NavLink to={item.href} >
                                        <h5
                                            className={`${
                                                item.current
                                                    ? "z-50 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                                    : "hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500"
                                            } block px-4 py-2 text-sm text-gray-700`}
                                        >
                                          {item.name}
                                        </h5>
                                      </NavLink>

                                </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
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
                      <h1 className="text-base font-medium">{user.username}</h1>
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
                          <NavLink to={admin_controllers[0].href}>
                            <h5
                                className={`${
                                    admin_controllers[0].current
                                        ? "z-50 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                        : "hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500"
                                } block px-4 py-2 text-sm text-gray-700`}
                            >
                              {admin_controllers[0].name}
                            </h5>
                          </NavLink>

                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            onClick={logoutUser}
                            to={admin_controllers[1].href}
                          >
                            <h5
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              {admin_controllers[1].name}
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
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            show={open}
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
              <hr/>
              <h5
                  className={`block px-3 py-2 text-base font-bold`}
              >
                Data Management
              </h5>
              <hr/>
              {navigation_for_management.map((item) => (
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
              <hr/>
              <h5
                  className={`block px-3 py-2 text-base font-bold`}
              >
                Insights
              </h5>
              <hr/>
              {navigation_for_insights.map((item) => (
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
