import React, { useState } from 'react'
import {
  Box,  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,useToast,
  IconButton,
  ModalCloseButton,
  } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../userAvatar/UserBadgeItem';
const UpdateGroupChatModal = ({fetchAgain,setFetchAgain}) => {
  const {isOpen ,onOpen, onClose} = useDisclosure();
  const [groupChatName,setGroupName] = useState();
  const [search,setSearch] = useState("");
  const [ searchResult,setSearchResult] = useState([]);
  const [loading,setLoading] = useState(false);
  const [renameLoading,setRenameLoading] = useState(false)

  const toast  =useToast()
  const {selectedChat, setSelectedChat, user} = ChatState();

  const handleRemove =(duser)=>(
    selectedChat.users.filter((u)=>duser._id!==u._id)
  )

  console.log(selectedChat.ChatName)
  return (
    <>     
    <IconButton d={{base:"flex"}} icon={<ViewIcon></ViewIcon>} onClick={onOpen} ></IconButton>   
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="35px" 
          fontFamily="Work sans" 
          d="flex"
          justifyContent="center"
          >{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Box>
           {selectedChat.users.map((u)=>(
             <UserBadgeItem key={u._id} user={u} handleFunction={()=>handleRemove(u)}></UserBadgeItem>
           ))}
           </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal
