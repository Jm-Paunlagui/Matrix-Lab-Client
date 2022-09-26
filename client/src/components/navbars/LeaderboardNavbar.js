import { NavLink, useLocation } from "react-router-dom";

import React from "react";

export default function LeaderboardNavbar() {
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
    return splitLocation[3] === link;
  }

  /**
   * @description Handles the navigation bar for the admin pages
   * @type {[{current: boolean, name: string, href: string},{current: boolean, name: string, href: string},{current: boolean, name: string, href: string},{current: boolean, name: string, href: string},{current: boolean, name: string, href: string}]}
   */
  const navigation = [
    {
      name: "Department",
      href: "/admin/leaderboard/departments",
      current: isActive("departments"),
    },
    {
      name: "Employee",
      href: "/admin/leaderboard/employees",
      current: isActive("employees"),
    },
  ];

  return (
    <div className="flex items-center justify-between px-4 py-3 mx-auto bg-white border-t border-gray-200 max-w-7xl sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
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
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav
            className="inline-flex -space-x-px rounded-md shadow isolate"
            aria-label="Pagination"
          >
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
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
          </nav>
        </div>
      </div>
    </div>
  );
}
