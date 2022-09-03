import { Link } from "react-router-dom";
import React from "react";

/**
 * @type {Array}
 * @description Links to be displayed in the footer
 */
 const UsefulLinks = [
  {
    name: "About Us",
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
 * @type {React.FC<{}>}
 * @description Footer component for the application that displays useful links
 */
const Footer = () => {
  return (
    <footer className="pt-8 pb-6 mt-auto text-gray-500 font-Montserrat ">
      <div className="container px-4 mx-auto max-w-7xl">
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <h4 className="text-2xl font-semibold">
              Let&apos;s keep in touch!
            </h4>
            <h5 className="mt-0 mb-2 text-lg text-gray-600">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 mb-6 space-x-4 text-blue-500 lg:mb-0">
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
          <div className="w-full px-4 lg:w-6/12">
            <div className="flex flex-wrap mb-6 items-top">
              <div className="w-full px-4 mb-6 ml-auto md:w-1/2 lg:w-4/12 ">
                <span className="block mb-2 text-sm font-semibold text-gray-500 uppercase">
                  Useful Links
                </span>
                <ol className="list-unstyled">
                  {UsefulLinks.map((link) => (
                    <li key={link.name}>
                      <Link to={`/${link.link}`}>
                        <div className="block pb-2 text-sm font-semibold text-gray-500 hover:text-gray-800">
                          {link.name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
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
};

export default Footer;
