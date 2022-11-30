import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Explore from "./pages/explore";
import HomeFeed from "./pages/homefeed";
import CollegeFinder from "./pages/collegefinder";
import Profile from "./components/profile";
import { Button } from "@material-ui/core";
import Login from './components/login'
import SignUp from './components/signup'
import Answer from "./pages/answer";
import { Provider } from 'react-redux';
import store from './redux/store';
// import {PersistGate} from 'redux-persist/es/integration/react'

function App() {
  return (
    <Provider store={store}>
    {/* <PersistGate loading={null} persistor={Redux.persistor}> */}
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/logout" element={<Home/>}  />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/home" element={<HomeFeed/>} />
        <Route path="/profile" element={<Profile/>} />
        {/* <Route path="/" element={<Button variant="contained" href="#contained-buttons">Login</Button>} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/collegefinder" element={<CollegeFinder/>} />
        <Route path="/answer" element={<Answer/>} />
      </Routes>
    </Router>
    {/* </PersistGate> */}
    </Provider>
  );
}
export default App;