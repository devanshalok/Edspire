import { Box, Text, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux';



function Data() {
  
  const profile = useSelector(state => {
    if (state.userSlice.profile) {
      console.log('state is ', state.userSlice)
      return state.userSlice.profile
    } return undefined
  });
  const list = [
    {
      id: 1,
      name: 'Questions Asked',
      value: profile.questionsAsked,
      color: 'yellow',
    },
    {
      id: 2,
      name: 'Answers Given',
      value: profile.answersGiven,
      color: 'green',
    },
    {
      id: 3,
      name: 'Comments Given',
      value: 0,
      color: 'cadet',
    },
  ]
  return (
    <VStack as="ul" spacing={0} listStyleType="none">
      {list.map(item => (
        <Box
          key={item.id}
          as="li"
          w="full"
          py={3}
          px={5}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          <Text color="brand.dark">{item.name}</Text>
          <Text color={`brand.${item.color}`} fontWeight="bold">
            {item.value}
          </Text>
        </Box>
      ))}
    </VStack>
  )
}

export default Data
