import { useState } from 'react'
import "./Login.css";
import { Link } from "react-router-dom";
import { Modal } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import config from '../config/index';
import { addProfile } from "../redux/userSlice";

import React from 'react'

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const token = useSelector(state => {
    if (state.userSlice.profile && state.userSlice.profile.token) {
      console.log('state is ',state.userSlice)
      return state.userSlice.profile.token
    } return undefined
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
  }
  function handleSignup() {

    axios.post(config.BASE_URL + '/signup', {
      email,
      password,
      firstName,
      lastName
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        dispatch(addProfile({ ...response.data.data.userDetails, token: response.data.data.token }));
        navigate('/home')
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}
/>
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Re-enter Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <Link to="/login" >
            Sign in?
          </Link>
        </p>
      </form>
    </div>
  )
}


//  profile page
//  question ka Modal
//  answer ka page
//  explore spaces ka page
