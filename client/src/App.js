import "react-toastify/dist/ReactToastify.css";

import React, { useLayoutEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import AboutUS from "./views/pub/AboutUS.js";
import IndexAuth from "./views/auth/IndexAuth.js";
import ForgotPasswordReq from "./views/auth/ForgotPasswordReq.js";
import Home from "./views/pub/Home.js";
import IndexPub from "./views/pub/IndexPub.js";
import Leaderboard from "./views/pub/Leaderboard.js";
import Login from "./views/auth/Login.js";
import PageNotFound from "./views/pub/PageNotFound.js";
import PrivacyPolicy from "./views/pub/PrivacyPolicy.js";
import TermsAndConditions from "./views/pub/TermsAndConditions.js";
import { ToastContainer } from "react-toastify";

/**
 * @description Main component for the application
 */
export default function App() {
  /**
   * @type {Function}
   * @description Function to scroll to top of the page when route changes in the application
   */
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  return (
    <Router>
      <ToastContainer autoClose={3000} position="bottom-right" />
      <Wrapper>
        <Routes>
          {/**
           * @description Handles public routes for the application and the IndexPub component has the outlet for the
           * public routes
           */}
          <Route element={<IndexPub />}>
            <Route exact="true" path="/" element={<Home />} />
            <Route exact="true" path="leaderboard" element={<Leaderboard />} />
            <Route exact="true" path="aboutus" element={<AboutUS />} />
            <Route
              exact="true"
              path="privacy-policy"
              element={<PrivacyPolicy />}
            />
            <Route
              exact="true"
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
          </Route>
          {/**
           * End of public routes
           */}

          {/**
           * @description Handles auth routes for the application and the IndexAuth component has the outlet for the
           * auth routes
           */}
          <Route element={<IndexAuth />}>
            <Route exact="true" path="auth" element={<Login />} />
            <Route
              exact="true"
              path="forgot-password"
              element={<ForgotPasswordReq />}
            />
          </Route>
          {/**
           * End of auth routes
           */}
          {/**
           * @description Handles admin routes for the application and the IndexAdmin component has the outlet for the
           * admin routes
           */}
          <Route exact="true" path="admin" element={<div>Admin</div>} />

          {/**
           * @description Handles page not found route for the application
           */}
          <Route path="*" element={<PageNotFound />} />
          {/**
           * End of page not found route
           */}
        </Routes>
      </Wrapper>
    </Router>
  );
}
