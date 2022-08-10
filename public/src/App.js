import React,{useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/Register/Register'
import Userpage from './components/UserPage/Userpage'
import ApplicationPage from './components/ApplicationPage/application'
import Login from './components/Login/Login'
import AdminHome from './components/AdminHome/adminHome'
import AdminLogin from "./components/AdminLogin/adminLogin"
import Slotbooking from "./components/Slotbooking/slotBooking"
import "../node_modules/react-toastify/dist/ReactToastify.css"
import {UserContext} from './Context/userContext'
import ApplicationForm from "./components/ApplicationForm/ApplicationForm"
import ApplicationStatus from './components/ViewAppStatus/viewAppStatus'
import ViewApplications from "./components/ViewApplicationUser/viewApplicationuser" 
import ViewApplicationAdmin from "./components/ViewApplicationAdmin/viewApplication"

export default function App() {
const [username,setUsername]= useState("")

  return (
    
    <BrowserRouter>
    <UserContext.Provider value={{username,setUsername}}>     
       <Routes>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Userpage/>}/>
        <Route exact path="/applicationPage" element={<ApplicationPage/>}/>
        <Route exact path="/admin" element={<AdminHome/>} />
        <Route exact path="/adminLogin" element={<AdminLogin/>} />
        <Route exact path="/slotbooking" element={<Slotbooking/>}/>
        <Route exact path="/applicationform" element={<ApplicationForm/>}/>
        <Route exact path='/status' element={<ApplicationStatus/>}/>
        <Route exact path='/viewApps' element={<ViewApplications/>}/>
        <Route exact path="/admin/viewapplication" element={<ViewApplicationAdmin/>}/>
        <Route exact path="/*" element={<h1>Invalid route</h1>}/>
      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}
