import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Explore from "./pages/explore";
import Connect from "./pages/connect";
import CollegeFinder from "./pages/collegefinder";
import { Button } from "@material-ui/core";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}  />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/connect" element={<Connect/>} />
        <Route path="/collegefinder" element={<CollegeFinder/>} />
        <Route path="/" element={<Button variant="contained" href="#contained-buttons">Login</Button>} />
      </Routes>
    </Router>
  );
}
export default App;