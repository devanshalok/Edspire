import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup, Select
} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { addProfile } from '../../redux/userSlice';

function CompanySettings({ profile }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // let greScore = profile.greScore;
  const [greScore, setGreScore] = useState(profile.greScore);
  const [ieltsScore, setIeltsScore] = useState(profile.ieltsScore);
  const [university, setUniversity] = useState(profile.university || "Select a University");
  const [branch, setBranch] = useState(profile.branch);
  const [underGradPercent, setUnderGradPercent] = useState(profile.underGradPercent);
  const [backlogs, setBacklogs] = useState(profile.backlogs);
  const [workExperienceYears, setWorkExperienceYears] = useState(profile.workExperienceYears);
  const [universities, setUniversities] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    axios.get(config.BASE_URL + '/universities', {
      headers: {
        'Authorization': profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        setUniversities(response.data.data.universities);
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
    axios.get(config.BASE_URL + '/branches', {
      headers: {
        'Authorization': profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        setBranches(response.data.data.branches)
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }, []);


  const handleUpdate = () => {
    let updateObject = {
      greScore,ieltsScore,university,branch,underGradPercent,backlogs,workExperienceYears
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
      <p style={{ marginBottom: "20px", fontSize: "20px", fontFamily: "sans-serif" }}>GRE Score</p>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={6}
      >
        <FormControl id="greTotal">
          <FormLabel>Total Score</FormLabel>
          <InputGroup>
            <Input
              focusBorderColor="brand.blue"
              type="number"
              placeholder="340"
              value={greScore} onChange={(e) => setGreScore(e.target.value)}
            />
          </InputGroup>
        </FormControl>

      </Grid>

      <p style={{ marginTop: "20px", marginBottom: "20px", fontSize: "20px", fontFamily: "sans-serif" }}>IELTS Score</p>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={6}
      >
        <FormControl id="ieltsOverall">
          <FormLabel>Overall Band</FormLabel>
          <InputGroup>
            <Input
              focusBorderColor="brand.blue"
              type="number"
              step={0.5}
              placeholder="7.0"
              value={ieltsScore} onChange={(e) => setIeltsScore(e.target.value)}
            />
          </InputGroup>
        </FormControl>
      </Grid>

      <p style={{ marginTop: "20px", marginBottom: "20px", fontSize: "20px", fontFamily: "sans-serif" }}>Education Details</p>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={6}
      >
        <FormControl id="companyId">
          <FormLabel>University Name</FormLabel>
          <Select value={university} onChange={(e)=>setUniversity(e.target.value)}>
            <option value="Select a University">Select a University</option>
            {universities.map(university => <option value={university.name}>{university.name}</option>)}
          </Select>
          {/* <InputGroup>
            <Input
              focusBorderColor="brand.blue"
              type="text"
              placeholder="IIT Delhi" />
          </InputGroup> */}
        </FormControl>
        <FormControl>
          <FormLabel>Branch</FormLabel>
          <Select value={branch} onChange={(e)=>setBranch(e.target.value)}>
            <option value="Select a Branch">Select a Branch</option>
            {branches.map(branch => <option value={branch.name}>{branch.name}</option>)}
          </Select>
          {/* <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="Computer Science" /> */}
        </FormControl>
        <FormControl id="Percentage">
          <FormLabel>Percentage</FormLabel>
          <Input focusBorderColor="brand.blue" type="text" placeholder="80"
            value={underGradPercent} onChange={(e) => setUnderGradPercent(e.target.value)}
          />
        </FormControl>
        <FormControl id="emailCompany">
          <FormLabel>Backlogs</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="number"
            placeholder="0"
            value={backlogs} onChange={(e) => setBacklogs(e.target.value)}
          />
        </FormControl>

      </Grid>
      <p style={{ marginTop: "20px", marginBottom: "20px", fontSize: "20px", fontFamily: "sans-serif" }}>Work Experience</p>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={6}
      >        <FormControl id="experienceYears">
          <FormLabel>Years of Experience</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="number"
            placeholder="0"
            value={workExperienceYears} onChange={(e) => setWorkExperienceYears(e.target.value)}
          />
        </FormControl>
        {/* <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light"/> */}
      </Grid>
      <br></br>
      <Button onClick={handleUpdate}>Update</Button>

    </>

  )
}

export default CompanySettings
