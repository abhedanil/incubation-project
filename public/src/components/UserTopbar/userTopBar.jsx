import React from 'react'
import "../CssFiles/userTopBar.css"
import {NotificationsNone, Language, Settings} from '@mui/icons-material';

function userTopBar() {
    return (
        <div className='topbar'>
            <div className='topbarWrapper'>
                <div className='topLeft'>
                    <span className='logo'> User</span>
                  
                </div>
    
                <div className='topRight'>
                    <div className="topbarIconsContainer">
                        <NotificationsNone/>
                        <span className='topIconBadge'>2</span>
                    </div>
                    <div className="topbarIconsContainer">
                        <Language/>
                       
                    </div>
                    <div className="topbarIconsContainer">
                        <Settings/>
                    </div>
                    <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
                </div>
             </div>
        </div>
      )
}

export default userTopBar
