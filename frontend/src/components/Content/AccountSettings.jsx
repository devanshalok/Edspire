import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react'
import { Box, Button } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { addProfile } from '../../redux/userSlice';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

function AccountSettings({ profile }) {
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  // const [password, setPassword] = useState(profile.password);
  // const [confirmPassword, setConfirmPassword] = useState(profile.confirmPassword);
  const [city, setCity] = useState(profile.city);
  const [state, setState] = useState(profile.state);
  const [country, setCountry] = useState(profile.country);
  const [linkedIn, setlinkedIn] = useState(profile.linkedIn);
  const [twitter, settwitter] = useState(profile.twitter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [alert, setAlert] = useState("");
  const handleUpdate = () => {
    let updateObject = {
      firstName, lastName, city, state, country, linkedIn, twitter
    }
    axios.put(config.BASE_URL + '/profile', updateObject, {
      headers: {
        'Authorization': profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        let alert = <Alert status='info'>
          <AlertIcon />
          <AlertTitle>Profile Updated Successfully!</AlertTitle>
          {/* <AlertDescription>Your Chakra experience may be degraded.</AlertDescription> */}
        </Alert>
        dispatch(addProfile({ ...response.data.data.profile, token: response.data.data.token }));
        // navigate('/home')
        setAlert(alert);
        setTimeout(()=>setAlert(),3000);
      } else {
        let alert = <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Some error occurred while updating profile !</AlertTitle>
          {/* <AlertDescription>Your Chakra experience may be degraded.</AlertDescription> */}
        </Alert>
        console.log('some exception occurred', response);
        setAlert(alert);
        setTimeout(()=>setAlert(),3000);

      }
    }).catch(error => console.log('some exception occurred', error));
  }
  return (
    <>
      {alert }
      <br />
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={6}
      >
        {/* <Alert severity = "error" onClose={() => {}}>{errorMessage}</Alert> */}
        <FormControl id="firstName">
          <FormLabel>First Name</FormLabel>
          <Input focusBorderColor="brand.blue" type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>
        <FormControl id="lastName">
          <FormLabel>Last Name</FormLabel>
          <Input focusBorderColor="brand.blue" type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </FormControl>
        <FormControl id="emailAddress">
          <FormLabel>Email Address</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="email"
            placeholder="jdoe@gmail.com"
            disabled
          />
        </FormControl>
        <FormControl id="city">
          <FormLabel>City</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="San Jose"
            value={city} onChange={(e) => setCity(e.target.value)}
          />
        </FormControl>
        <FormControl id="state">
          <FormLabel>State</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="California"
            value={state} onChange={(e) => setState(e.target.value)}
          />
        </FormControl>
        <FormControl id="country">
          <FormLabel>Country</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="United States Of America"
            value={country} onChange={(e) => setCountry(e.target.value)}
          />
        </FormControl>
        <FormControl id="linkedIn">
          <FormLabel>LinkedIn profile</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="Enter full profile link here"
            value={linkedIn} onChange={(e) => setlinkedIn(e.target.value)}
          />
        </FormControl>
        <FormControl id="twitter">
          <FormLabel>Twitter</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="Enter Twitter profile link here"
            value={twitter} onChange={(e) => settwitter(e.target.value)}
          />
        </FormControl>
      </Grid>
      <br></br>
      <Button onClick={handleUpdate}>Update</Button>
    </>
  )
}

export default AccountSettings
