import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FounderDetails from './pages/FounderDetails';
import InvesterDetails from './pages/InvesterDetails';
import FounderProfile from './pages/FounderProfile';
import InvestorProfile from './pages/InvestorProfile';
import ExploreStartups from './pages/ExploreStartups';

function App() {
  const location = useLocation();

  return (
    <div>
      {/* Display Navbar only on Home Page */}
      {location.pathname === '/' && <Navbar showLoginButton={true} />}
      <Navbar/>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-founder" element={<FounderDetails />} />
        <Route path="/signup-investor" element={<InvesterDetails />} />
        <Route path="/founder-profile" element={<FounderProfile />} />
        <Route path="/investor-profile" element={<InvestorProfile />} />
        <Route path="/explore-startups" element={<ExploreStartups />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
