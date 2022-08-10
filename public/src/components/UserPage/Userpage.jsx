import React from 'react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import '../CssFiles/userPage.css'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import UserTopBar from "../UserTopbar/userTopBar"
import UserSidebar from '../UserSidebar/userSidebar'
import Content from "../UserContents/UserContents"


export default function Userpage() {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    document.title = "Incubation-management"
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login")
      }
      else {
        console.log("dskfkkkkkkkkkkkkkkkkkkkk");
        const { data } = await axios.post("http://localhost:4000", {},
          { withCredentials: true, }
        );
        if (!data.status) {
          removeCookie("jwt")
          navigate("/login")
        }
      }
    }
    verifyUser()
  }, [cookies, navigate])

  return (
    <>
      <div className="App">

      <UserTopBar/>
       <div className="container">
            <UserSidebar/>
            <div className='others'>
              <Content/>
            </div>
        </div>

      </div>
    </>

  )
}