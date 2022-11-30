import React, { useEffect, useState } from "react";
import { makeStyles, } from "@material-ui/core";
import "./Login.css";
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "./helpers"
import { Container } from '@chakra-ui/layout'
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

export default function Profile() {

  const initialProfile = useSelector(state => {
    if (state.userSlice.profile) {
      console.log('state profile is ', state.userSlice)
      return state.userSlice.profile
    } return undefined
  });
  const [profile,setProfile] = useState(initialProfile);
  
  const {token} = profile;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // axios.get(config.BASE_URL + '/profile', { headers: { 'Authorization': token } }).then(response => {
    //   if (response.status == 200 && response.data.statusCode == 200) {
    //     console.log(response.data);
    //     setProfile(response.data.data.questions)
    //     // state.questions = response.data.data.questions;
    //     // localStorage.setItem('questions', JSON.stringify(response.data.data.questions));
    //   } else {
    //     console.log('some exception occurred', response)
    //   }
    // }).catch(error => console.log('some exception occurred', error));
  }, [])


  return (
    <div style={{ marginTop: "100px" }} className="Login">
      <ChakraProvider theme={theme}>
        <Container display={{ base: 'block', md: 'flex' }} maxW="container.xl">
          <Sidebar profile={profile}/>
          <Content profile={profile}/>
        </Container>
      </ChakraProvider>
    </div>
  );
}





