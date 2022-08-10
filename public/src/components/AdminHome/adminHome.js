import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Topbar from '../AdminTopbar/Topbar'
import Sidebar from '../AdminSidebar/adminSidebar'
import axios from 'axios'
import '../CssFiles/adminHome.css'
import Home from "../../pages/Home"
import 'bootstrap/dist/css/bootstrap.min.css';
function adminHome() {
  const navigate =useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies([]);
  
  useEffect(() => {
    const verifyAdmin = async () => {
      if (!cookies.jwt) {
        navigate("/adminLogin");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/admin",
          {},
          { withCredentials: true }
        );
        if(!data.status){
          removeCookie('jwt');
          navigate('/adminLogin');
        }
      }
    };
    verifyAdmin();
  }, [cookies, navigate, removeCookie]);

  return (
    <div>
       <Topbar/>
       <div className="container">
            <Sidebar/>
            <div className='others'>
              <Home/>
            </div>
        </div>


    </div>
  )
}

export default adminHome
