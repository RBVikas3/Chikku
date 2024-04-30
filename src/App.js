import Home from "./components/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx" 
import { Routes, Route ,BrowserRouter} from "react-router-dom";
import OpenRoute from "./components/Core/Security/OpenRoute.js";
import PrivateRoute from "./components/Core/Security/PrivateRoute.js";
import { useEffect } from "react";
import { setToken } from "./redux/slices/authSlice.js";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token")
    && JSON.parse(localStorage.getItem("token"))
    dispatch(setToken(token))
  },[])
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/* Add more routes here */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
