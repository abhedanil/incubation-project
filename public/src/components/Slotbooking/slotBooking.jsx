import React from 'react'
import Topbar from '../AdminTopbar/Topbar'
import Sidebar from '../AdminSidebar/adminSidebar'
import Slot from "../Slot/Slot"
function slotBooking() {
    return (
        <div>
           <Topbar/>
           <div className="container">
                <Sidebar/>
                <div className='others'>
                  <Slot/>
                </div>
            </div>
    
    
        </div>
      )
}

export default slotBooking
