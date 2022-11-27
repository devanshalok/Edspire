import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {makeStyles,} from "@material-ui/core";
import "./Login.css";
import { Link } from "react-router-dom";
import Profile from "./profile";
import { Box } from '@chakra-ui/react'

const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(5),
      display: "flex",
    },
    link: {
      textDecoration: "none",
      color: "black",
      fontSize: "15px",
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
      "&:hover": {
        color: "blue",
        borderBottom: "1px solid white",
      },
    },
  }));

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button style={{marginTop:"20px",width:"330px"}} block="true" size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <p>New to Edspire?<Link to="/signup" className={classes.link}>
              Signup here
            </Link></p>
      </Form>
      
    </div>
  );
}