import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios';
import '../CssFiles/register.css';
export default function Register() {
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
            const {data} = await axios.post("http://localhost:4000/register",
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
                    navigate("/login")
                }
              }
        }
        
        catch(err){
            console.log(err)
        }
        
    }

  return (
    <div className="body">
    <div className='containers'>
        <h2>Register Account</h2>
        <form onSubmit={(e)=>handleSubmit(e)} className="form" >
            <div className="formdiv">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email" onChange={(e)=>
                setValues({ ...values,[e.target.name]:e.target.value})
                }
                />
            </div>
            <div  className="formdiv">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="password" onChange={(e)=>
                setValues({ ...values,[e.target.name]:e.target.value})
                }
                />
            </div>
            <button type="submit">Submit</button>
            <span>
                Already have an account? <Link to="/login">Login</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
    </div>
  )
}
