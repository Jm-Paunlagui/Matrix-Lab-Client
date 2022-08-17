import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
  return (
    <Router>
      <ToastContainer autoClose={3000} position='bottom-right'/>
      <Routes>
        <Route exact="true" path='/' element={<Landing />}>
          <Route exact="true" path='/' element={<Home />} />
          <Route exact="true" path='leaderboard' element={<Leaderboard />} />
          <Route exact="true" path='aboutus' element={<AboutUS />} />
          <Route exact="true" path='privacy-policy' element={<PrivacyPolicy />} />
          <Route exact="true" path='terms-and-conditions' element={<TermsAndConditions />} />
          <Route exact="true" path='auth' element={<Login />} />
        </Route>
        
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App