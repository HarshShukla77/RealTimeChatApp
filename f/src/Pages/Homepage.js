import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
 
  Container,Box,Text,Tabs, TabList,
  TabPanel,
  TabPanels,
  Tab,

 
} from "@chakra-ui/react";
import Signup from '../components/Authentication/Signup';
import Login from '../components/Authentication/Login';
const Homepage = () => {

    const navigate = useNavigate();

   useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user) navigate("/chats");
   },[navigate])


  return (
    <Container maxW ="xl">
    <Box d="flex"
    justifyContent="center"
    p={3} w="100%" m="40px 0 15px 0 " borderRadius ="lg" borderWidth="1px" bg={"white"} >
      <Text   fontSize='4xl' fontFamily="Work sans"  >Talk-A-Tive</Text>
      </Box>
      
      <Box bg="white" w="100%" p={4} borderRadius="lg" color="black" borderWidth="1px" >
      <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
           <Login></Login>
            </TabPanel>

            <TabPanel>
            <Signup></Signup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      
      </Container>
  )
}

export default Homepage
