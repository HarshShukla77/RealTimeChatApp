import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import {
  Box,Text,IconButton
  } from '@chakra-ui/react';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
const SingleChat = (fetchAgain,setFetchAgain)=>{
  const {user,selectedChat,setSelectedChat} = ChatState();
  return (
    <>
      {
        selectedChat ?( <>
        <Text
          fontSize={{ base: "28px", md: "30px" }}
          pb={3}
          px={2}
          w="100%"
          fontFamily="Work sans"
          d="flex"
          justifyContent={{ base: "space-between" }}
          alignItems="center"
        >
         <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
          {
            !selectedChat.isGroupChat ? (
              <>
              {getSender(user,selectedChat.users)}
              <ProfileModal user={getSenderFull(user,selectedChat.users)}></ProfileModal>
              </>
            ):(
              <>
              {
                selectedChat.chatName.toUpperCase()

              }

              {
                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} ></UpdateGroupChatModal>
              }

              </>

            )
          }
          </Text>
          <Box   d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"  >
          messages are seen here
          </Box>

        </>):(
          <Box d="flex" alignItems="center" justifyContent="center" h="100%"  >
            <Text fontSize="3xl" pb={3} fontFanily="Work sans" >
              Click on a user to start chatting
            </Text>
          </Box>
        )
      }
    </>
  )
}

export default SingleChat
