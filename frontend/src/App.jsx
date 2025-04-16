import HomePage from "./pages/HomePage";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { Routes, Route } from "react-router-dom";


function App() {



return (
  <div>
    <h1>LaunchPad</h1>

    <Routes>
        <Route path='/' element={<HomePage  />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
  </div>
)

}

export default App
