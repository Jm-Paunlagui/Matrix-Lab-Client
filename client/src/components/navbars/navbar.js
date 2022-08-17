import { useState } from "react";
import { NavLink, } from "react-router-dom"

import { GoThreeBars } from "react-icons/go"
import { AiFillHome } from "react-icons/ai";
import { MdLeaderboard } from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import { RiLoginCircleFill } from "react-icons/ri";
import logo from '../../assets/img/android-chrome-192x192.png';

const Navbar = () => {

    const [navbarOpen, setNavbarOpen] = useState(false);

    // If has access_token, then show the Dashboard link
    const tokenAuth = localStorage.getItem("access_token");
    // check the length of the token
    
    const navIcon = tokenAuth ? <TbDeviceAnalytics size={24} title="Dashboard"/> : <RiLoginCircleFill size={24} title="Sign-in"/>;
    const link = tokenAuth ? "/admin" : "/auth";

    return (
        <>
            <nav className="fixed top-0 flex flex-wrap items-center justify-between w-full p-1 bg-blue-900 shadow navbar-expand-lg font-Montserrat">
                <div className="container flex flex-wrap items-center justify-between mx-auto ">
                    <div className="flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
                        <NavLink to="/" 
                            className="flex items-center px-3 py-2 text-gray-100 rounded-md hover:text-gray-300 hover:backdrop-blur-md hover:bg-white/10 hover:rounded-md">
                            <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
                            <h1 className="hidden ml-3 font-bold tracking-widest text-md md:flex">MATRIX LAB</h1>
                            <h1 className="ml-3 font-bold tracking-widest text-md md:hidden">MATRIX LAB</h1>
                        </NavLink>
                        <button
                            className="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <GoThreeBars color="white"/>
                            
                        </button>
                    </div>
                        <div
                            className={
                                "lg:flex flex-grow items-center bg-blue-900 lg:bg-opacity-0 lg:shadow-none" +
                                (navbarOpen ? " block" : " hidden")
                            }
                            id="example-navbar-warning"
                        >
                        <ul className="flex flex-col justify-start list-none lg:flex-row lg:ml-auto">
                            <NavLink to ="/"
                                    className="text-white">
                                <li className="flex items-center p-4 hover:backdrop-blur-md hover:bg-white/10 hover:rounded-md">
                                    <AiFillHome size={24} title="Home"/>
                                    <h1 className="block px-8 text-sm font-medium tracking-wider text-gray-100 blockml-3 lg:hidden">Home</h1>
                                </li>
                            </NavLink>
                            <NavLink to ="leaderboard"
                                    className="text-white">
                                <li className="flex items-center p-4 hover:backdrop-blur-md hover:bg-white/10 hover:rounded-md">
                                    <MdLeaderboard size={24} title="Leaderboard"/>
                                    <div className="block px-8 text-sm font-medium tracking-wider text-gray-100 blockml-3 lg:hidden">Leaderboard</div>
                                </li>
                            </NavLink>
                            <NavLink to ={link}
                                    className="text-white">
                                <li className="flex items-center p-4 hover:backdrop-blur-md hover:bg-white/10 hover:rounded-md">
                                    {navIcon}
                                    
                                    <div className="block px-8 text-sm font-medium tracking-wider text-gray-100 blockml-3 lg:hidden">{tokenAuth ? "Dashboard" : "Sign-in"}</div>
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar