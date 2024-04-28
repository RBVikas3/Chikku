import Home from "./components/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx" 
import { Routes, Route ,BrowserRouter} from "react-router-dom";
import OpenRoute from "./components/Core/Security/OpenRoute.js";
import PrivateRoute from "./components/Core/Security/PrivateRoute.js";

function App() {
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
