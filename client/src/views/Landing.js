import Footer from "../components/footers/footer";
import Navbar from "../components/navbars/propsNavbar";
import { Outlet } from "react-router-dom";
import React from "react";
import logo from "../assets/img/android-chrome-192x192.png";

const Landing = () => {
  
  const items = [
    {
      id: 1,
      titlel: "Home",
      link: "/",     
    },
    {
      id: 2,
      titlel: "Dashboard",
      link: "admin",
    },
    {
      id: 3,
      titlel: "Sign-in",
      link: "auth",
    },
    {
      id: 4,  
      titlel: "Leaderboard",
      link: "leaderboard",
    },
  ]

  return (
    <>
      <Navbar main={"/"} logo={logo} 
      title={"MATRIX LAB"} navitems={items} />
      <div className="bg-white">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Landing;
