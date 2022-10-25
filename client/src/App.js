import React, { useLayoutEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboard from "./views/admin/AdminDashboard.js";
import AdminPrediction from "./views/admin/AdminPrediction.js";
import AdminProfile from "./views/admin/AdminProfile.js";
import AdminSettings from "./views/admin/AdminSettings.js";
import AdminTables from "./views/admin/AdminTables.js";
import IndexAdmin from "./views/admin/IndexAdmin";
import IndexLeaderboard from "./views/admin/leaderboard/IndexLeaderboard";
import LeaderboardDepartment from "./views/admin/leaderboard/LeaderboardDepartment";
import LeaderboardEmployees from "./views/admin/leaderboard/LeaderboardEmployees";
import AuthForgotPasswordRequest from "./views/auth/AuthForgotPasswordRequest.js";
import AuthLogin from "./views/auth/AuthLogin.js";
import AuthLogout from "./views/auth/AuthLogout";
import AuthResetPassword from "./views/auth/AuthResetPassword";
import IndexAuth from "./views/auth/IndexAuth.js";
import PrivacyPolicy from "./views/legal/PrivacyPolicy.js";
import TermsAndConditions from "./views/legal/TermsAndConditions.js";
import IndexPublic from "./views/public/IndexPublic.js";
import PublicAbout from "./views/public/PublicAbout.js";
import PublicHome from "./views/public/PublicHome.js";
import PublicLeaderboard from "./views/public/PublicLeaderboard.js";
import PublicRanking from "./views/public/PublicRanking.js";
import PageNotFound from "./views/response/PageNotFound.js";
import IndexUser from "./views/user/IndexUser";
import UserDashboard from "./views/user/UserDashboard";
import UserProfile from "./views/user/UserProfile";
import EvalCourseSentimentTable from "./views/user/eval/EvalCourseSentimentTable";
import EvalCourses from "./views/user/eval/EvalCourses";
import IndexEval from "./views/user/eval/IndexEval";

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
           * public routes.
           */}
          <Route element={<IndexPublic />}>
            <Route element={<PublicAbout />} exact="true" path="aboutus" />
            <Route element={<PublicHome />} exact="true" path="/" />
            <Route
              element={<PublicLeaderboard />}
              exact="true"
              path="leaderboard"
            />
            <Route element={<PublicRanking />} exact="true" path="ranking" />
          </Route>
          {/**
           * End of public routes
           */}

          <Route
            element={<PrivacyPolicy />}
            exact="true"
            path="privacy-policy"
          />
          <Route
            element={<TermsAndConditions />}
            exact="true"
            path="terms-and-conditions"
          />

          {/**
           * @description Handles auth routes for the application, and the IndexAuth component has the outlet for the
           * auth routes.
           */}
          <Route element={<IndexAuth />}>
            <Route
              element={<AuthForgotPasswordRequest />}
              exact="true"
              path="forgot-password"
            />
            <Route element={<AuthLogin />} exact="true" path="auth" />
            <Route
              element={<AuthResetPassword />}
              exact="true"
              path="reset-password/:token"
            />
          </Route>
          {/**
           * End of auth routes
           */}
          {/**
           * @description Handles admin routes for the application, and the IndexAdmin component has the outlet for the
           * admin routes.
           */}
          <Route element={<IndexAdmin />} exact="true" path="admin">
            <Route element={<AdminDashboard />} exact="true" path="dashboard" />
            <Route
              element={<IndexLeaderboard />}
              exact="true"
              path="leaderboard"
            >
              <Route
                element={<LeaderboardDepartment />}
                exact="true"
                path="departments"
              />
              <Route
                element={<LeaderboardEmployees />}
                exact="true"
                path="employees"
              />
            </Route>
            <Route element={<AdminPrediction />} exact="true" path="analyze" />
            <Route
              element={<AdminProfile />}
              exact="true"
              path="profile/:username"
            />
            <Route element={<AdminSettings />} exact="true" path="settings" />
            <Route element={<AdminTables />} exact="true" path="management" />
            <Route element={<AuthLogout />} exact="true" path="logout" />
          </Route>
          {/**
           * End of admin routes
           * */}

          {/**
           * @description Handles user routes for the application, and the IndexUser component has the outlet for the
           * user routes.
           */}
          <Route element={<IndexUser />} exact="true" path="user">
            <Route element={<IndexEval />} exact="true" path="programs">
              <Route element={<EvalCourses />} exact="true" path="courses">
                <Route
                  element={<EvalCourseSentimentTable />}
                  path=":courseId"
                />
              </Route>
            </Route>
            <Route element={<UserDashboard />} exact="true" path="dashboard" />
            <Route element={<UserProfile />} exact="true" path="profile" />
          </Route>

          {/**
           * @description Handles page not found route for the application
           */}
          <Route element={<PageNotFound />} path="*" />
          {/**
           * End of page not found route
           */}
        </Routes>
      </Wrapper>
    </Router>
  );
}
