import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { NavLink, useResolvedPath } from "react-router-dom";
import React,  { Fragment } from "react"

import logo from "../../assets/img/android-chrome-192x192.png";

export default function AdminNavigationBar(to) {

    const router = useResolvedPath(to);

    function isActive (link) {
        return router.pathname === link;
    }

    const navigation = [
        { name: "Dashboard", href: "/admin/dashboard", current: isActive("/admin/dashboard") },
        { name: "Tables", href: "/admin/tables" , current: isActive("/admin/tables")},
        { name: "Predict", href: "/admin/predict" , current: isActive("/admin/predict")},
        { name: "Leaderboard", href: "/admin/leaderboard" , current: isActive("/admin/leaderboard")},
        { name: "Ranking", href: "/admin/ranking" , current: isActive("/admin/ranking")},
    ]

    const user_controllers = [
        { name: "Your Profile", href: "/admin/profile" },
        { name: "Sign out", href: "admin/logout" },
    ]
  return (
      <Disclosure as="nav" className="bg-gray-800 shadow-md font-Montserrat">
        {({ open }) => (
            <>
              <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                          <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                      ) : (
                          <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                    <div className="flex items-center flex-shrink-0">
                      <img
                          className="block w-auto h-8 lg:hidden"
                          src={logo}
                          alt="Your Company"
                      />
                      <img
                          className="hidden w-auto h-8 lg:block"
                          src={logo}
                          alt="Your Company"
                      />
                    </div>

                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                            >
                              <h5 className={`${item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} block px-3 py-2 rounded-md text-base font-medium`}>
                                {item.name}
                              </h5>
                            </NavLink>
                        ))}
                      </div>
                    </div>

                  </div>

                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                        type="button"
                        className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                              className="w-8 h-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                          />
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
                                <NavLink
                                    to={user_controllers[0].href}
                                >
                                    <h5 className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`} >
                                        {user_controllers[0].name}
                                    </h5>
                                </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                                <NavLink
                                    to={user_controllers[1].href}
                                >
                                    <h5 className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`} >
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
              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                        >
                            <h5 className={`${item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} block px-3 py-2 rounded-md text-base font-medium`}>
                                {item.name}
                            </h5>
                        </NavLink>
                    ))}
                </div>
              </Disclosure.Panel>
              </Transition>
            </>
        )}
      </Disclosure>
  )
}
