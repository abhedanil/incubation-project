import React from 'react'

import '../CssFiles/adminSidebar.css'
import {Link,useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { LineStyle, Timeline,TrendingUp} from '@mui/icons-material';
import "../CssFiles/userSidebar.css"



function userSidebar() {
        const navigate= useNavigate()
        const [cookies, setCookie, removeCookie] = useCookies([]);
        const logOut = () => {
          removeCookie("jwt");
          navigate("/login");
        };
         
  return (
    <div className="sidebar">
    <div className="sidebarWrapper">
      <div className="sidebarMenu">
        <h3 className="sidebarTitle">Dashboard</h3>
        <ul className="sidebarList">
          <Link to="/" className="link">
          </Link>

         

          <li className="sidebarListItem" onClick={()=>navigate("/status")}>
            <Timeline className="sidebarIcon" />
            Application Status
          </li>
          <li className="sidebarListItem" onClick={()=>navigate("/viewApps")}>
            <Timeline className="sidebarIcon" />
            View Applications 
          </li>
          
          <li className="sidebarListItem" onClick={()=>navigate("/applicationform")}>
            <TrendingUp className="sidebarIcon" />
            Apply For Slot
          </li>
          
          <li className="sidebarListItem" onClick={logOut}>
            <TrendingUp className="sidebarIcon" />
            Logout
            
          </li>
        </ul>
      </div>
      
    </div>
  </div>
  )
}

export default userSidebar
