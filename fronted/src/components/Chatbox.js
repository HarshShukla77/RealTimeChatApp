import React from 'react'
import { ChatState } from "../Context/ChatProvider";
import {
Box,
} from '@chakra-ui/react';

import SingleChat from './SingleChat';
const Chatbox = ({fetchAgain,setFetchAgain}) => {
  const { user, chats, setChats,selectedChat } = ChatState();
  
  return (
   <Box d={{base: selectedChat ? "flex" :"none", md:"flex"}} 
   w={{base:"100%" ,md:"68%"}} 
   bg="white"
   p={3}
   flexDir="column" 
   borderRaduis ="lg" 
   borderWidth  ="1px" 
   alignItems ="center" 

    >
    <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} ></SingleChat>
   </Box>
   )

};

export default Chatbox
