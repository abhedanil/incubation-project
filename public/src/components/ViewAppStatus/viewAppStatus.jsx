import React from 'react'
import UserTopBar from "../UserTopbar/userTopBar"
import UserSidebar from '../UserSidebar/userSidebar'
import ApplicationStatus from "../ApplicationStatus/applicationStatus"

function viewAppStatus() {
  return (
    <>
    <div className="App">

    <UserTopBar/>
     <div className="container">
          <UserSidebar/>
          <div className='others'>
            <ApplicationStatus/>
          </div>
      </div>

    </div>
  </>
  )
}

export default viewAppStatus

