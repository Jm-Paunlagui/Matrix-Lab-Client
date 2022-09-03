import "react-toastify/dist/ReactToastify.css";

import React, { useLayoutEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import AboutUS from "./views/AboutUS.js";
import Auth from "./views/auth/Auth.js";
import ForgotPasswordReq from "./views/auth/ForgotPasswordReq.js";
import Home from "./views/Home.js";
import Landing from "./views/Landing.js";
import Leaderboard from "./views/Leaderboard.js";
import Login from "./views/auth/Login.js";
import PageNotFound from "./views/PageNotFound.js";
import PrivacyPolicy from "./views/PrivacyPolicy.js";
import TermsAndConditions from "./views/TermsAndConditions.js";
import { ToastContainer } from "react-toastify";

/**
 * @type {React.FC<{}>}
 * @description Main component for the application
 */
function App() {
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
          <Route element={<Landing />}>
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

          <Route element={<Auth />}>
            <Route exact="true" path="auth" element={<Login />} />
            <Route
              exact="true"
              path="forgot-password"
              element={<ForgotPasswordReq />}
            />
          </Route>

          <Route exact="true" path="admin" element={<div>Admin</div>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
