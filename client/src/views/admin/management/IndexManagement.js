import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { isAuth } from "../../../helpers/Auth";

/**
 * @description Handles admin pages for the application
 */
export default function IndexManagement() {
    return isAuth().role === "admin" ? (
        <>
            {/*<ManagementNavbar />*/}
            <div className="mt-16 font-Montserrat">
                <Outlet />
            </div>
        </>
    ) : (
        <Navigate to="/unauthorized-access" />
    );
}