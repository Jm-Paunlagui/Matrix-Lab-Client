import "react-toastify/dist/ReactToastify.css";

import React, { useLayoutEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import AdminDashboard from "./views/admin/AdminDashboard.js";
import AdminPrediction from "./views/admin/AdminPrediction.js";
import AdminProfile from "./views/admin/AdminProfile.js";
import AdminSettings from "./views/admin/AdminSettings.js";
import AdminTables from "./views/admin/AdminTables.js";
import AuthForgotPasswordRequest from "./views/auth/AuthForgotPasswordRequest.js";
import AuthLogin from "./views/auth/AuthLogin.js";
import IndexAdmin from "./views/admin/IndexAdmin";
import IndexAuth from "./views/auth/IndexAuth.js";
import IndexLeaderboard from "./views/admin/leaderboard/IndexLeaderboard";
import IndexPublic from "./views/public/IndexPublic.js";
import LeaderboardDepartment from "./views/admin/leaderboard/LeaderboardDepartment";
import LeaderboardEmployees from "./views/admin/leaderboard/LeaderboardEmployees";
import PageNotFound from "./views/response/PageNotFound.js";
import PrivacyPolicy from "./views/legal/PrivacyPolicy.js";
import PublicAbout from "./views/public/PublicAbout.js";
import PublicHome from "./views/public/PublicHome.js";
import PublicLeaderboard from "./views/public/PublicLeaderboard.js";
import PublicRanking from "./views/public/PublicRanking.js";
import TermsAndConditions from "./views/legal/TermsAndConditions.js";
import { ToastContainer } from "react-toastify";

import IndexUser from "./views/user/IndexUser";
import UserDashboard from "./views/user/UserDashboard";
import UserProfile from "./views/user/UserProfile";
import EvalCourseSentimentTable from "./views/user/eval/EvalCourseSentimentTable";
import IndexEval from "./views/user/eval/IndexEval";
import EvalCourses from "./views/user/eval/EvalCourses";
import AuthResetPassword from "./views/auth/AuthResetPassword";

/**
 * @description Main component for the application
 */
export default function App() {
  /**
   * @type {Function}
   * @description Function to scroll to top of the page when route changes in the application.
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
           * @description Handles public routes for the application, and the IndexPublic component has the outlet for the
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
            <Route exact="true" path="ranking" element={<PublicRanking />} />
          </Route>
          {/**
           * End of public routes
           */}

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

          {/**
           * @description Handles auth routes for the application, and the IndexAuth component has the outlet for the
           * auth routes
           */}
          <Route element={<IndexAuth />}>
            <Route
              exact="true"
              path="forgot-password"
              element={<AuthForgotPasswordRequest />}
            />
            <Route exact="true" path="auth" element={<AuthLogin />} />
            <Route
              exact="true"
              path="reset-password/:token"
              element={<AuthResetPassword />}
            />
          </Route>
          {/**
           * End of auth routes
           */}
          {/**
           * @description Handles admin routes for the application and the IndexAdmin component has the outlet for the
           * admin routes
           */}
          <Route exact="true" path="admin" element={<IndexAdmin />}>
            <Route exact="true" path="dashboard" element={<AdminDashboard />} />
            <Route
              exact="true"
              path="leaderboard"
              element={<IndexLeaderboard />}
            >
              <Route
                exact="true"
                path="departments"
                element={<LeaderboardDepartment />}
              />
              <Route
                exact="true"
                path="employees"
                element={<LeaderboardEmployees />}
              />
            </Route>
            <Route exact="true" path="analyze" element={<AdminPrediction />} />
            <Route exact="true" path="profile/:username" element={<AdminProfile />} />
            <Route exact="true" path="settings" element={<AdminSettings />} />
            <Route exact="true" path="management" element={<AdminTables />} />
          </Route>
          {/**
           * End of admin routes
           * */}

          {/**
           * @description Handles user routes for the application, and the IndexUser component has the outlet for the
           * user routes.
           */}
          <Route exact="true" path="user" element={<IndexUser />}>
            <Route exact="true" path="programs" element={<IndexEval />}>
              <Route exact="true" path="courses" element={<EvalCourses />}>
                <Route
                  path=":courseId"
                  element={<EvalCourseSentimentTable />}
                />
              </Route>
            </Route>
            <Route exact="true" path="dashboard" element={<UserDashboard />} />
            <Route exact="true" path="profile" element={<UserProfile />} />
          </Route>

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
