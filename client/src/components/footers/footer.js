import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
            <footer className="pt-8 pb-6 mt-auto text-gray-500 font-Montserrat ">
                <div className="container px-4 mx-auto max-w-7xl">
                <hr className="my-6 border-gray-300" />
                    <div className="flex flex-wrap text-center lg:text-left">
                        <div className="w-full px-4 lg:w-6/12">
                            <h4 className="text-2xl font-semibold">Let's keep in touch!</h4>
                            <h5 className="mt-0 mb-2 text-lg text-gray-600">
                                Find us on any of these platforms, we respond 1-2 business days.
                            </h5>
                            <div className="mt-6 mb-6 lg:mb-0">
                                <button className="items-center justify-center w-10 h-10 mr-2 font-normal bg-white rounded-full shadow-lg outline-none text-lightBlue-400 align-center focus:outline-none" type="button">
                                    <a className="fab fa-twitter" href="https://twitter.com/messages/719487995892539393-719487995892539393?text=" target={"_blank"} rel="noreferrer noopener"> </a>
                                    
                                </button>
                                <button className="items-center justify-center w-10 h-10 mr-2 font-normal bg-white rounded-full shadow-lg outline-none text-lightBlue-600 align-center focus:outline-none" type="button">
                                    <a className="fab fa-facebook-messenger" href="https://www.messenger.com/t/100001178366981" target={"_blank"} rel="noreferrer noopener"> </a>
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
                                        <li>
                                            <Link to="/aboutus" className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800">
                                                About Us
                                            </Link>
                                        </li>
                                        
                                        <li>
                                            <Link to="terms-and-conditions" className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800">
                                                Terms & Conditions
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/privacy-policy" className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800">
                                                Privacy Policy
                                            </Link>
                                        </li>
                                    </ol>
                                </div>
                                <div className="w-full px-4 md:w-1/2 lg:w-4/12">
                                    <span className="block mb-2 text-sm font-semibold text-gray-500 uppercase">
                                        Developer Resources
                                    </span>
                                    <ol className="list-unstyled">
                                        <li>
                                            <a href="https://www.github.com/Projects-REPO" target={"_blank"} rel="noreferrer noopener" className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800" >
                                                Github
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.tensorflow.org/" target={"_blank"} rel="noreferrer noopener" className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800" >
                                                Tensorflow
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://keras.io/" target={"_blank"} rel="noreferrer noopener" className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800" >
                                                Keras
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://reactjs.org/" target={"_blank"} rel="noreferrer noopener" className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800" >
                                                React
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://reactrouter.com/" target={"_blank"} rel="noreferrer noopener" className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800" >
                                                React Router
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://tailwindcss.com/" target={"_blank"} rel="noreferrer noopener" className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800" >
                                                Tailwind CSS
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-300" />
                    <div className="flex flex-wrap items-center justify-center md:justify-between">
                        <div className="w-full px-4 mx-auto text-center md:w-4/12">
                            <div className="py-1 text-sm font-semibold text-gray-500">
                                Copyright © {new Date().getFullYear()} Sentry AI by{" "}
                                <Link to="https://www.creative-tim.com?ref=nr-footer" className="text-gray-500 hover:text-gray-800" >
                                Morning Group
                                </Link>
                                .
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
    );
}

export default Footer;