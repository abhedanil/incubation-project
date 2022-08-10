import React,{useState,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'

import '../CssFiles/Login.css';
export default function Login() {
   
    const navigate = useNavigate()
    const [values,setValues]= useState({
        email:"",
        password:""
    })

    const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post("http://localhost:4000/login",
            {...values},
            {withCredentials:true},
            )
            console.log(data)
            if (data) {
               
                if (data.errors) {
                    console.log(data.errors,6454454646)
                    console.log("abcd")
                  const {email,password} = data.errors;
                  if (email) generateError(email);
                  else if (password) generateError(password);
                } else {
                    navigate("/")
                }
              }
        }
        
        catch(err){
            console.log(err)
        }
        
    }
  return (
    <div className='body'>
    <div className='containers'>
        <h2>Login Account</h2>
        <form onSubmit={(e)=>handleSubmit(e)} className="form">
            <div className="formdiv">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email" onChange={(e)=>
                setValues({ ...values,[e.target.name]:e.target.value})
                }
                />
            </div>
            <div className="formdiv">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="password" onChange={(e)=>
                setValues({ ...values,[e.target.name]:e.target.value})
                }
                />
            </div>
            <button type="submit">Submit</button>
            <span>
                Already have an account? <Link to="/register">Register</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
    </div>
  )
}
