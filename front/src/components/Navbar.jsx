import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import React from 'react'
import { useSelector } from 'react-redux'
import { Link,Navigate,useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useState,useEffect } from 'react';
import Upload from './Upload';

const Container = styled.div`
  position:sticky;
//   top:5px;
  background-color:${({ theme }) => theme.bgLighter};
  height:45px;
`
const Wrapper = styled.div`
display:flex;
align-items:center; 
justify-content:flex-end;
height:100%;
padding:0px 20px;
position:relative;
`;
const Search = styled.div`
width:40%;
position:absolute;
left:0px;
right:0px;
margin:auto;
display:flex;
align-items:center; 
justify-content:space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius: 3px;
color: ${({ theme }) => theme.text};
margin-top:5px;
`;
const Input = styled.input`
background-color:transparent;
border:none;
outline:none;
color: ${({ theme }) => theme.text};

`;
const Button = styled.button`
padding:5px 15px;
margin-top:5px;
background-color:transparent;
border: 1px solid #3ea6ff;
color:#3ea6ff;
border-radius:3px;
cursor:pointer;
display:flex;
align-items:center;
gap:5px; 
`;

const User=styled.div`
   display:flex;
   align-items:center;
   gap:10px;
   font-weight:500;
   color:${({theme})=>theme.text}
`

const Avatar=styled.img`
    width:32px;
    border-radius:50%;
    height:32px;
    background-color:#999;
`

const Navbar = () => {
    const [open,setOpen]=useState(false)
    const [q,setQ]=useState("")
    const {currentUser}=useSelector(state=>state.user)
    const navigate=useNavigate()
    return (
        <>
        <Container>
            <Wrapper>
                <Search>
                    <Input placeholder="Search" onChange={(e)=>setQ(e.target.value)}/>
                    <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${q}`)}/>
                </Search>
                {currentUser ? (<User> <VideoCallOutlinedIcon onClick={()=>setOpen(true)}/>
                <Avatar src={currentUser.img}/>
                {currentUser.name}
                </User>):
                (<Link to="/signin" style={{textDecoration:"none"}}>
                <Button>
                    <AccountCircleOutlined />
                    SIGN IN
                </Button>
                </Link>)}

{/* comment and uncommnet this */}
                 {/* <User> <VideoCallOutlinedIcon/>
                <Avatar src={currentUser.img}/>
                {currentUser.name}
                </User>
                <Link to="/signin" style={{textDecoration:"none"}}>
                <Button>
                    <AccountCircleOutlined />
                    SIGN IN
                </Button>
                </Link>  */}

            </Wrapper>
        </Container>
        {open && <Upload setOpen={setOpen}/>}
        </>
    )
}

export default Navbar

