import React, { useLayoutEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Landing from './views/Landing.js'
import Home from './views/Home.js'
import Login from './views/auth/Login.js'
import Leaderboard from './views/Leaderboard.js'
import AboutUS from './views/AboutUS.js'
import PrivacyPolicy from './views/PrivacyPolicy.js'
import TermsAndConditions from './views/TermsAndConditions.js'
import PageNotFound from './views/PageNotFound.js'

const App = () => {

  // To automatically scroll to the top of the page when the user navigates to a new page
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  }

  return (
    <Router>
      <ToastContainer autoClose={3000} position='bottom-right'/>
      <Wrapper>
        <Routes>
            <Route element={<Landing />}>
              <Route exact="true" path='/' element={<Home />} />
              <Route exact="true" path='leaderboard' element={<Leaderboard />} />
              <Route exact="true" path='aboutus' element={<AboutUS />} />
              <Route exact="true" path='privacy-policy' element={<PrivacyPolicy />} />
              <Route exact="true" path='terms-and-conditions' element={<TermsAndConditions />} />
            </Route>
          <Route exact="true" path='auth' element={<Login />} />
          <Route exact="true" path="admin" element={<div>Admin</div>} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Wrapper>
    </Router>
  )
}

export default App