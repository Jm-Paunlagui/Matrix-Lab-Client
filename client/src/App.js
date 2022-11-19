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
import IndexAdmin from "./views/admin/IndexAdmin";
import IndexInsights from "./views/insights/IndexInsights";
import InsightsDepartment from "./views/insights/InsightsDepartment";
import InsightsEmployees from "./views/insights/InsightsEmployees";
import InsightsPerSemesterDepartment from "./views/insights/InsightsPerSemesterDepartment";
import InsightsPerSemesterEmployees from "./views/insights/InsightsPerSemesterEmployees";
import AuthForgotPasswordRequest from "./views/auth/AuthForgotPasswordRequest.js";
import AuthLogin from "./views/auth/AuthLogin.js";
import AuthLogout from "./views/auth/AuthLogout";
import AuthRemoveEmailFromAccount from "./views/auth/AuthRemoveEmailFromAccount";
import AuthResetPassword from "./views/auth/AuthResetPassword";
import IndexAuth from "./views/auth/IndexAuth.js";
import PrivacyPolicy from "./views/legal/PrivacyPolicy.js";
import TermsAndConditions from "./views/legal/TermsAndConditions.js";
import IndexPublic from "./views/public/IndexPublic.js";
import PublicAbout from "./views/public/PublicAbout.js";
import PublicHome from "./views/public/PublicHome.js";
import {
  PageNotFound,
  InvalidToken,
  Unauthorized,
} from "./views/response/ClientErrorResponses.js";
import IndexUser from "./views/user/IndexUser";
import UserDashboard from "./views/user/UserDashboard";
import UserProfile from "./views/user/UserProfile";
import EvalCourseSentimentTable from "./views/user/eval/EvalCourseSentimentTable";
import EvalCourses from "./views/user/eval/EvalCourses";
import IndexEval from "./views/user/eval/IndexEval";
import IndexManagement from "./views/admin/management/IndexManagement";
import ManagementFiles from "./views/admin/management/ManagementFiles";
import ManagementProfessors from "./views/admin/management/ManagementProfessors";

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
    <>
      <ToastContainer
        autoClose={5000}
        className="z-50"
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        position="bottom-right"
        rtl={false}
        theme="colored"
      />
      <Router>
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
                element={<InsightsDepartment />}
                exact="true"
                path="department-sentiment-overall"
              />
              <Route
                element={<InsightsPerSemesterDepartment />}
                exact="true"
                path="department-sentiment"
              />
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
            <Route
              element={<AuthRemoveEmailFromAccount />}
              exact="true"
              path="remove-email-from-account/:token"
            />
            {/**
             * End of auth routes
             */}
            {/**
             * @description Handles admin routes for the application, and the IndexAdmin component has the outlet for the
             * admin routes.
             */}
            <Route element={<IndexAdmin />} exact="true" path="admin">
              <Route
                element={<AdminDashboard />}
                exact="true"
                path="dashboard"
              />
              <Route element={<IndexInsights />} exact="true" path="insights">
                <Route
                  element={<InsightsDepartment />}
                  exact="true"
                  path="departments"
                />
                <Route
                  element={<InsightsEmployees />}
                  exact="true"
                  path="employees"
                />
                <Route
                  element={<InsightsPerSemesterDepartment />}
                  exact="true"
                  path="per-semester-department"
                />
                <Route
                  element={<InsightsPerSemesterEmployees />}
                  exact="true"
                  path="per-semester-employee"
                />
              </Route>
              <Route
                element={<AdminPrediction />}
                exact="true"
                path="analyze"
              />
              <Route
                element={<AdminProfile />}
                exact="true"
                path="profile/:username"
              />
              <Route element={<AdminSettings />} exact="true" path="settings" />
              <Route
                element={<IndexManagement />}
                exact="true"
                path="management"
              >
                <Route
                  element={<ManagementFiles />}
                  exact="true"
                  path="files"
                />
                <Route
                  element={<ManagementProfessors />}
                  exact="true"
                  path="professors"
                />
              </Route>
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
              <Route
                element={<UserDashboard />}
                exact="true"
                path="dashboard"
              />
              <Route
                element={<UserProfile />}
                exact="true"
                path="profile/:username"
              />
              <Route element={<AuthLogout />} exact="true" path="logout" />
            </Route>

            <Route element={<Unauthorized />} path="unauthorized-access" />
            {/**
             * @description Handles page not found route for the application
             */}
            <Route element={<PageNotFound />} path="*" />
            {/**
             * End of page not found route
             */}
            <Route element={<InvalidToken />} path="invalid-token" />
          </Routes>
        </Wrapper>
      </Router>
    </>
  );
}
