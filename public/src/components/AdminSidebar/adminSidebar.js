import React from 'react'
import '../CssFiles/adminSidebar.css'
import {Link,useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,} from '@mui/icons-material';

function adminSidebar() {
  const navigate= useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const logOut = () => {
    removeCookie("jwt");
    navigate("/adminLogin");
  };


  return (

      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/" className="link">
              </Link>

             

              <li className="sidebarListItem" onClick={()=>navigate("/admin")}>
                <Timeline className="sidebarIcon" />
                Application List
              </li>
              
              <li className="sidebarListItem" onClick={()=>navigate("/slotbooking")}>
                <TrendingUp className="sidebarIcon" />
                Booking Slot
              </li>
              
              <li className="sidebarListItem" onClick={logOut}>
                <TrendingUp className="sidebarIcon" />
                Logout
                
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    );
}

export default adminSidebar