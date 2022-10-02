import { Outlet } from "react-router-dom";
import React from "react";

/**
 * @description Handles admin pages for the application
 */
export default function IndexEval() {
    return (
        <>
            <div className="mt-16 font-Montserrat">
                <Outlet />
            </div>
        </>
    );
}
