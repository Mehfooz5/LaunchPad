import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-2">
      <Navbar /> {/* 👈 insert here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
