import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FounderDetails from './pages/FounderDetails';
import InvesterDetails from './pages/InvesterDetails';
import FounderProfile from './pages/FounderProfile';
import InvestorProfile from './pages/InvestorProfile';
import ExploreStartups from './pages/ExploreStartups';
import UpdateStartup from './pages/UpdateStartup';
import StartupDetail from './pages/StartupDetail';
import ChatPage from './pages/ChatPage';
import FounderDMPage from './pages/FounderDMPage';
import AddStartup from './pages/AddStartup';
import AboutUs from './pages/AboutUs';
import ProtectedRoute from './Components/ProtectedRoute'; 
import ChatBot from './pages/ChatBot'; // Import the ChatBot component

function App() {
  const location = useLocation();

  return (
    <div>
      {/* Show special navbar only on home */}
      {location.pathname === '/' && <Navbar showLoginButton={true} />}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-founder" element={<FounderDetails />} />
        <Route path="/signup-investor" element={<InvesterDetails />} />

        {/* Protected Routes */}
        <Route
          path="/founder-profile"
          element={
            <ProtectedRoute>
              <FounderProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/investor-profile"
          element={
            <ProtectedRoute>
              <InvestorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-startup"
          element={
            <ProtectedRoute>
              <AddStartup />
            </ProtectedRoute>
          }
        />
        <Route path="/update-startup/:startupId"
         element={
          <ProtectedRoute>
            <UpdateStartup />
          </ProtectedRoute>
          } />
        <Route path="/founder-dm" element={<FounderDMPage />} />
        <Route path="/chat/:founderId" element={<ChatPage />} />
        <Route path="/startup/:startupId" element={<StartupDetail />} />
        <Route path="/explore-startups" element={<ExploreStartups />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/chatbot" element={<ChatBot />} /> 
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
