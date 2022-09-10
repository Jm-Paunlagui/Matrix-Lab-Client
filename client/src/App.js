import "react-toastify/dist/ReactToastify.css";

import React, { useLayoutEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import PublicAbout from "./views/public/PublicAbout.js";
import AuthForgotPasswordRequest from "./views/auth/AuthForgotPasswordRequest.js";
import PublicHome from "./views/public/PublicHome.js";
import IndexAuth from "./views/auth/IndexAuth.js";
import IndexPublic from "./views/public/IndexPublic.js";
import PublicLeaderboard from "./views/public/PublicLeaderboard.js";
import AuthLogin from "./views/auth/AuthLogin.js";
import PageNotFound from "./views/response/PageNotFound.js";
import PrivacyPolicy from "./views/legal/PrivacyPolicy.js";
import PublicRanking from "./views/public/PublicRanking.js";
import TermsAndConditions from "./views/legal/TermsAndConditions.js";
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
           * @description Handles public routes for the application and the IndexPublic component has the outlet for the
           * public routes
           */}
          <Route element={<IndexPublic />}>
            <Route exact="true" path="aboutus" element={<PublicAbout />} />
            <Route exact="true" path="/" element={<PublicHome />} />
            <Route
              exact="true"
              path="leaderboard"
              element={<PublicLeaderboard />}
            />
          </Route>
          {/**
           * End of public routes
           */}

          <Route
            exact="true"
            path="privacy-policy"
            element={<PrivacyPolicy />}
          />
          <Route exact="true" path="ranking" element={<PublicRanking />} />
          <Route
            exact="true"
            path="terms-and-conditions"
            element={<TermsAndConditions />}
          />

          {/**
           * @description Handles auth routes for the application and the IndexAuth component has the outlet for the
           * auth routes
           */}
          <Route element={<IndexAuth />}>
            <Route
              exact="true"
              path="forgot-password"
              element={<AuthForgotPasswordRequest />}
            />
            <Route exact="true" path="auth" element={<AuthLogin />} />
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
