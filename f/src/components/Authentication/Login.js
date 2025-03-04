import React, { useState } from 'react'
import {useToast, VStack} from '@chakra-ui/react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import axios from "axios";
import { useHistory } from 'react-router-dom';
const Login = () => {
    const history = useHistory();
    const [email,setEmail] = useState();
    const [show,setShow] = useState(false);
    const [password,setPassword] = useState();
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const handleclick =()=>setShow(!show);
    const submitHandler = async()=>{
                setLoading(true);
                if(!email || !password){
                    toast({
                        title: "Please enter all fields",
                        status: "warning",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    setLoading(false);
                    return;
                }
                try{
                    const config ={
                        headers:{
                            "Content-type":"application/json",
                        },
                    };
                    const {data} = await axios.post("/api/user/login",
                        {email,password},config
                    );
                    toast({
                        title: "Login Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                      });
                    //   setUser(data);
                      localStorage.setItem("userInfo",JSON.stringify(data));
                      setLoading(false);
                      history.push("/chats");

                }catch(err){
                    toast({
                        title: "Error Occured!",
                        description: err.response?.data?.message || "Something went wrong",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                      });
                      setLoading(false);
                }

    }
  return<VStack spacing="5px" >
    
      <FormControl id="email " isRequired >
          <FormLabel>Email</FormLabel>
          <Input placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)} ></Input>
      </FormControl>
  
      <FormControl id="password "  isRequired >
          <FormLabel>Password</FormLabel>
          <InputGroup>
          <Input placeholder='Enter Your Password' type={ show?"text": "password"} onChange={(e)=>setPassword(e.target.value)} ></Input>
          <InputRightElement w="4.5rem"  >
          <Button onClick= {handleclick} h="1.75rem" size="sm"  >{show?"Hide":"Show"}</Button>
          </InputRightElement>
          </InputGroup>
      </FormControl>
  
          <Button colorScheme="blue" width="100%" color="white" style={{marginTop:15}} onClick={submitHandler} >Login</Button>
        <Button colorScheme="red" width="100% " color="white" style={{marginTop:15}} >Get Guest User Credentials </Button>
     </VStack>
}

export default Login
