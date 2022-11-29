import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup,
} from '@chakra-ui/react'

function CompanySettings() {
  return (
    <>
    <p style={{marginBottom:"20px",fontSize:"20px",fontFamily:"sans-serif"}}>GRE Score</p>
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
      <FormControl id="companyId">
        <FormLabel>Total Score</FormLabel>
        <InputGroup>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="340" />
        </InputGroup>
      </FormControl>
      <FormControl id="companyName">
        <FormLabel>Quantitative Section</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="170" />
      </FormControl>
      <FormControl id="emailCompany">
        <FormLabel>Verbal Section</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="170" />
      </FormControl>
      <FormControl>
        <FormLabel>Analytical Writing</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="3.0" />
      </FormControl>
    </Grid>
    
    <p style={{marginTop:"20px",marginBottom:"20px",fontSize:"20px",fontFamily:"sans-serif"}}>IELTS Score</p>
    <Grid 
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
        <FormControl id="companyId">
          <FormLabel>Speaking Section</FormLabel>
          <InputGroup>
            <Input
              focusBorderColor="brand.blue"
              type="text"
              placeholder="7.0" />
          </InputGroup>
        </FormControl>
        <FormControl id="companyName">
          <FormLabel>Listening Section</FormLabel>
          <Input focusBorderColor="brand.blue" type="text" placeholder="7.0" />
        </FormControl>
        <FormControl id="emailCompany">
          <FormLabel>Writing Section</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="7.0" />
        </FormControl>
        <FormControl>
          <FormLabel>Reading Section</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="7.0" />
        </FormControl>
      </Grid>

      <p style={{marginTop:"20px",marginBottom:"20px",fontSize:"20px",fontFamily:"sans-serif"}}>College Information</p>
    <Grid 
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
        <FormControl id="companyId">
          <FormLabel>College Name</FormLabel>
          <InputGroup>
            <Input
              focusBorderColor="brand.blue"
              type="text"
              placeholder="IIT Delhi" />
          </InputGroup>
        </FormControl>
        <FormControl id="Percentage">
          <FormLabel>Percentage</FormLabel>
          <Input focusBorderColor="brand.blue" type="text" placeholder="80%" />
        </FormControl>
        <FormControl id="emailCompany">
          <FormLabel>Backlogs</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="0" />
        </FormControl>
        <FormControl>
          <FormLabel>Branch</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="text"
            placeholder="Computer Science" />
        </FormControl>
      </Grid>
      </>
    
  )
}

export default CompanySettings
