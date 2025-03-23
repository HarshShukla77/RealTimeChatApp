import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import { Effect } from 'react-notification-badge';
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import {Avatar} from '@chakra-ui/avatar'
import UserListItem from '../userAvatar/UserListItem';
import ProfileModal from './ProfileModal'
import NotificationBadge from 'react-notification-badge'
import { ChatState } from "../../Context/ChatProvider"
import {BellIcon , ChevronDownIcon} from '@chakra-ui/icons'
import {Box,Button,Input,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,useDisclosure,Drawer,Tooltip,Text,Menu,MenuButton,MenuDivider,MenuItem,MenuList} from '@chakra-ui/react'
import {Spinner} from '@chakra-ui/spinner'
import { getSender } from '../../config/ChatLogics';
const SideDrawer = () => {
  const [search,setSearch] = useState("");
  const {user, setSelectedChat,notification,setNotification} = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchResult,setSearchResult] = useState([])
  const [loading , setLoading] = useState(false)
  const [loadingChat,setLoadingChat] = useState(false)
  
  const history = useHistory();
  const logoutHandler=()=>{
    localStorage.removeItem("userInfo")
    history.push("/");
  }
const toast = useToast()
  const handleSearch =async()=>{
    if(!search){
      toast({
        title:" Please Enter something in search",
        staus:"warning",
        duration:5000,
        isClosable:true,
        position:"top-left"
      })
      return ;
    }
    try{
        setLoading(true)
        const config = {
          headers : {
            Authorization : `Bearer ${user.token}`
          },
        };
        const {data} = await axios.get(`/api/user?search=${search}`,config)
        setLoading(false)
        setSearchResult(data)
    }
    catch(err){
      toast({
        title:" Error Occured",
        staus:"warning",
        duration:5000,
        isClosable:true,
        position:"top-left"
      })
    }
  }

  const accessChat = async (userId) =>{
      try{
        setLoadingChat(true)

        const config = {
          headers:{
            "Content-type":"application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const {data} = await axios.post("/api/chat",{userId},config)

        setSelectedChat(data)
        setLoadingChat(false)
        onClose();
      }catch(err){
        toast({
          title:"error fetching",
          description:err.message,
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom-left"
        })
      }
  }
  return (
    <div>
     <Box d="flex" justifyContent="space-between"  alignItems="center" bg="white" w="100%"  p="5px 10px 5px 10px" borderWidht="5px"  >
      <Tooltip label="Search Users to chat" hasArrow placement="bottom-end" >
      <Button variant="ghost"  onClick={onOpen}>
      <i class="fa-regular fa-magnifying-glass"></i>
      <Text d={{base:"none",md:"flex"}}  px="4" >
        Search User 🔍
      </Text>
      </Button>
      </Tooltip>
      <Text fontSize="2xl" fontFamily="Work sans" >Talk-A-Tive</Text>

      <div>
        <Menu>
          <MenuButton p={1} >
            <NotificationBadge count={notification.length} effect={Effect.SCALE} ></NotificationBadge>
            <BellIcon fontSize="2xl"  m={1} ></BellIcon>
          </MenuButton>
          <MenuList p={2}>
          {!notification.length && " No New Messages"}
          {notification.map((notify)=>(
            <MenuItem key={notify._id} onClick={()=>{
              setSelectedChat(notify.chat);
              setNotification(notification.filter((n)=>n!==notify))
            }} >
              {notify.chat.isGroupChat? `New Message in ${notify.chat.chatName}`:`New Message from ${getSender(user,notify.users)}`}
            </MenuItem>
          ))}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton  as={Button} rightIcon={<ChevronDownIcon></ChevronDownIcon>} >
          <Avatar size="sm" curson="pointer" name={user.name} src={user.pic} ></Avatar>
          </MenuButton>
          <MenuList>
            <ProfileModal  user={user} >
            <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider></MenuDivider>
            <MenuItem onClick={logoutHandler} >Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
     </Box>

    <Drawer placement='left' onClose={onClose}  isOpen={isOpen} >
      <DrawerOverlay></DrawerOverlay>
      <DrawerContent>
        <DrawerHeader>Search Users</DrawerHeader>
        <DrawerBody>
      <Box d="flex" pb={2} >
      <Input placeholder ="Search by name or email" mr={2} value={search} onChange={(e)=>setSearch(e.target.value)} ></Input>
      <Button onClick={handleSearch} >Go</Button>
      </Box>
      {loading ? (<ChatLoading></ChatLoading>):(
        searchResult?.map(user=>(
          <UserListItem key={user._id}
          user={user} handleFunction={()=>accessChat(user._id)} />
        ))
      )}
      {loadingChat && <Spinner ml="auto" d="flex" />}
      </DrawerBody>
      </DrawerContent>
     
    </Drawer>

    </div>
  )
}

export default SideDrawer
