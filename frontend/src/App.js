import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Explore from "./pages/explore";
import Connect from "./pages/connect";
import CollegeFinder from "./pages/collegefinder";
import Profile from "./components/profile";
import { Button } from "@material-ui/core";
import Login from './components/login'
import SignUp from './components/signup'
import Answer from "./pages/answer";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}  />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/connect" element={<Connect/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/" element={<Button variant="contained" href="#contained-buttons">Login</Button>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/collegefinder" element={<CollegeFinder/>} />
        <Route path="/answer" element={<Answer/>} />
      </Routes>
    </Router>
  );
}
export default App;