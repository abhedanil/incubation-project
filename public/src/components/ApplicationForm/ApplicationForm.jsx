import React from 'react'
import ApplicationPage from "../ApplicationPage/application"
import UserTopBar from "../UserTopbar/userTopBar"
import UserSidebar from '../UserSidebar/userSidebar'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'



function ApplicationForm() {
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
  const logOut = () => {
    removeCookie("jwt")
    navigate("/login")
  }
  return (
    <>
      <div className="App">

      <UserTopBar/>
       <div className="container">
            <UserSidebar/>
            <div className='others'>
              <ApplicationPage/>
            </div>
        </div>

      </div>
    </>

  )
}

export default ApplicationForm