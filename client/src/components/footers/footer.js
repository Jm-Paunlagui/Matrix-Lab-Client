import { Link } from "react-router-dom";
import React from "react";

/**
 * @type {Array}
 * @description Links to be displayed in the footer
 */
const UsefulLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "aboutus",
  },
  {
    name: "Terms & Conditions",
    link: "terms-and-conditions",
  },
  {
    name: "Privacy Policy",
    link: "privacy-policy",
  },
];

/**
 * @description Footer component for the application that displays useful links
 */
export default function Footer() {
  return (
    <footer className="px-6 pt-8 pb-6 mt-auto text-gray-500 font-Montserrat ">
      <div className="container mx-auto max-w-7xl">
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap py-4 text-center">
          <div className="items-center w-full lg:flex lg:space-x-6 place-content-center">
              <h4 className="text-2xl font-semibold text-gray-600">
                Let&apos;s keep in touch!
              </h4>
              <h5 className="text-lg">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
            <div className="mt-4 mb-6 space-x-4 text-blue-500 lg:mb-0 lg:mt-0 place-self-center">
              <button
                className="w-10 h-10 font-normal transition duration-700 ease-in-out delay-150 bg-white rounded-full shadow outline-none hover:shadow-lg align-center focus:outline-none hover:text-blue-700 hover:bg-gray-200 hover:-translate-y-1 hover:scale-110"
                type="button"
              >
                <a
                  className="fab fa-twitter "
                  href="https://twitter.com/messages/719487995892539393-719487995892539393?text="
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {" "}
                </a>
              </button>
              <button
                className="w-10 h-10 font-normal transition duration-700 ease-in-out delay-150 bg-white rounded-full shadow outline-none hover:shadow-lg align-center focus:outline-none hover:text-blue-700 hover:bg-gray-200 hover:-translate-y-1 hover:scale-110"
                type="button"
              >
                <a
                  className="fab fa-facebook-messenger hover:text-blue-700"
                  href="https://www.messenger.com/t/100001178366981"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {" "}
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap text-center">
          <div className="items-center w-full md:flex md:space-x-52 place-content-center">
            {UsefulLinks.map((link) => (
                <Link to={`/${link.link}`} key={link.name}>
                  <div className="block pb-2 text-sm font-semibold transition duration-300 ease-linear delay-150 hover:text-gray-800">
                    {link.name}
                  </div>
                </Link>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap md:justify-between">
          <div className="w-full px-4 mx-auto text-center md:w-4/12">

            <div className="py-1 text-sm font-semibold text-gray-500">
              Copyright © {new Date().getFullYear()} Matrix Lab by{" "}
              <Link to="https://www.creative-tim.com?ref=nr-footer">
                <div className="text-gray-500 hover:text-gray-800">
                  Morning Group.
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
