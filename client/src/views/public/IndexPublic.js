import Footer from "../../components/footers/Footer";
import NavigationBar from "../../components/navbars/NavigationBar";
import { Outlet } from "react-router-dom";
import React from "react";

/**
 * @description Handles about, home, insights, privacy, and terms page for the application
 */
export default function IndexPublic() {
  return (
    <>
      <NavigationBar />
      <div className="mt-16 bg-white font-Montserrat">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
