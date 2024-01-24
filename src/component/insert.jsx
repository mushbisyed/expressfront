import React from 'react'
import { useState } from 'react'
import  Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Insert() {
 let nav=useNavigate()
    const [user,setUser]=useState({name:"",phone:"",email:"",address:""});
    const OnClick=(e)=>{
        e.preventDefault()
       
        const name=user.name;
        const phone=user.phone;
        const email=user.email;
        const address=user.address;
        //============to use api in project install axios to give connection between front and back npm i axios
        Axios.post("http://localhost:5000/api/employe/insert",{name,phone,email,address},{headers:{"auth-token":localStorage.getItem("token")}})
        .then((res)=>{
            console.log(res)
            nav("/")
        })
        .catch((error)=>{
            console.log(error)
        })

    }
    const OnChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
    console.log(user)
    }
  return (
    <div style={{background:"pink"}}>
       <center> <h1 style={{fontFamily:"fantasy"}}>insert</h1></center>
        <form method='POST'>
       <center> <div className="mb-3" >
    <label for="exampleInputEmail1" className="form-label">Name:</label>
    <center><b><input type="name" className="form-control"  name='name'onChange={OnChange}  style={{width:'1000px'}}/></b></center>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Phone number:</label>
    <center><input type="tel" className="form-control" name="phone" onChange={OnChange} style={{width:'1000px'}}/></center>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email Address:</label>
    <center> <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={OnChange} style={{width:'1000px'}}/></center>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Address:</label>
    <center><b><input type="name" className="form-control" name="address" onChange={OnChange} style={{width:'1000px'}} /></b></center>
  </div>
 
  <button type="submit" className="btn btn-primary" onClick={OnClick}>Insert</button>

  </center>
        </form>
    </div>
  )
}
//if u get cors error install another package npm i -g cors
