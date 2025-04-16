import HomePage from "./pages/HomePage";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {



return (
  <div>
    <Navbar />
      
    <Routes>
        <Route path='/' element={<HomePage  />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
  </div>
)

}

export default App
