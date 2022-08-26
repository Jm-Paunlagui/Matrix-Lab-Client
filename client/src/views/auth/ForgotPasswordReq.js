import React from 'react'
import logo from '../../assets/img/android-chrome-192x192.png';
import { Link } from 'react-router-dom';

const ForgotPasswordReq = () => {
    return (
        <>
            <div className="container h-full px-4 mx-auto font-Montserrat">
                <div className="flex items-center content-center justify-center h-full">
                    <div className="w-5/6 md:w-6/12 lg:w-4/12 xl:w-3/12">
                        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white border-0 rounded-lg shadow-lg">
                            <div className="px-6 py-6 mb-0 rounded-t">
                                <div className="flex items-center px-3 py-2 text-gray-800 ">
                                    <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
                                    <h1 className="ml-3 font-bold tracking-widest text-md">MATRIX LAB</h1>
                                </div>
                            </div>
                            <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                                <div className="mb-3 text-start">
                                    <h6 className="text-lg font-bold text-gray-500">
                                        Forgot Password? 
                                    </h6>
                                </div>
                                <div className="mb-3 text-start">
                                    <p className="text-gray-700">
                                        Enter your email address below and we'll send you a new password.
                                    </p>
                                </div>
                                <form className="relative mx-auto mt-6 mb-6 max-w-screen">
                                    <input className="w-full p-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        placeholder="Email"
                                        />
                                    <button type="submit"
                                        className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-teal-700 rounded-lg hover:bg-blue-900 focus:shadow-outline focus:outline-none">
                                        <i className="fas fa-rotate-right w-6-ml-2" />
                                        <span className="ml-3">Reset Password</span>
                                    </button>
                                </form>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container h-full px-4 mx-auto">
                <div className="flex items-center content-center justify-center h-full">
                    <div className="w-5/6 md:w-6/12 lg:w-4/12 xl:w-3/12">
                        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white border-0 rounded-lg shadow-lg">
                            <div className="px-6 py-6 mb-0 rounded-t">
                                <div className="flex items-center px-3 py-2 text-gray-800 ">                                          
                                    <Link to="/auth" className="ml-3 font-medium tracking-widest text-md">
                                        <i className="fas fa-arrow-left w-6-ml-2" />
                                        <span className="ml-3">Back</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPasswordReq