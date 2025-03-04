import { ChatState } from "../Context/ChatProvider";
import {Box} from "@chakra-ui/react"
import SideDrawer from "../components/misla/SideDrawer";
const Chatpage = () => {
 const {user} = ChatState();
 
   
 
  return (
    <div style={{width:"100%"}} >
       {user && <SideDrawer/>}

      <Box>
          {/* {user && <MyChats/>}
          {user && <ChatBox></ChatBox>} */}

      </Box>
    
    </div>
  )
}

export default Chatpage
