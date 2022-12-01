import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react'
import { Box, Button } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { addProfile } from '../../redux/userSlice';

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

  const handleUpdate = () => {
    let updateObject = {
      firstName, lastName, city, state, country,linkedIn,twitter
    }
    axios.put(config.BASE_URL + '/profile', updateObject, {
      headers: {
        'Authorization': profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        dispatch(addProfile({ ...response.data.data.profile, token: response.data.data.token }));
        // navigate('/home')
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }
  return (
    <>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={6}
      >
        <FormControl id="firstName">
          <FormLabel>First Name</FormLabel>
          <Input focusBorderColor="brand.blue" type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>
        <FormControl id="lastName">
          <FormLabel>Last Name</FormLabel>
          <Input focusBorderColor="brand.blue" type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </FormControl>
        {/* <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="password"
            placeholder="**********"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl id="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="password"
            placeholder="**********"
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl> */}
        <FormControl id="emailAddress">
          <FormLabel>Email Address</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="email"
            placeholder="jdoe@gmail.com"
            disabled
          />
        </FormControl>
        {/* <FormControl id="street">
          <FormLabel>Street</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="1 Washington Square"
            value={street} onChange={(e) => setStreet(e.target.value)}

          />
        </FormControl> */}
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
