import React, { Component, Profiler } from 'react'
import "./Login.css";
import { Link } from "react-router-dom";
import { Modal } from '@material-ui/core';


export default class SignUp extends Component {
    
    
  render() {
    return (
        <div className="Login">
      <form>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-3">
          <label>Re-enter Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter password"
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
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
}

//  profile page 
//  question ka Modal
//  answer ka page
//  explore spaces ka page
