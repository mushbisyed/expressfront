import React, { useEffect,useState } from 'react'

import {useParams,useNavigate} from 'react-router-dom'
import Axios from 'axios'

export default function Update() {
  const params=useParams()
  let nav = useNavigate()
  console.log(params)
  
  const [user,setUser]=useState([])
  const [updateUser,setUpdateUser]=useState({name:"",phone:"",email:"",address:""})
  useEffect(()=>{
    Axios.get("http://localhost:5000/api/employe/get_employee")
    .then((res)=>{   //.then is try and catch block
       console.log(res)
       let newUser=(res.data).filter((item)=>{ 
        return item._id!=params.id
      })
      setUser(newUser);
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  const OnChange=(e)=>{
    setUser([{...user,[e.target.name]:e.target.value}])
setUpdateUser({...updateUser,[e.target.name]:e.target.value})
  console.log(user)}
  const Update=(e)=>{
    e.preventDefault();
    const name=updateUser.name;
    const phone=updateUser.phone;
    const email=updateUser.email;
    const address=updateUser.address;
    Axios.put(`http://localhost:5000/api/employe/update_employee/${params.id}`,{name,phone,email,address})
    .then((res)=>{   
       console.log(res)
    if (res.status === 200){
      nav("/")
    }
      })
     
   
    .catch((err)=>{
      console.log(err)
    })
  }

  


  return (
    <div style={{background:"pink"}}>
     
       <center> <h1>edit form</h1></center>
        <form method='POST'>
       <center> <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name:</label>
    <center><b><input type="name" className="form-control"  name='name'  value={user[0]?.name} onChange={OnChange}  style={{width:'1000px'}} /></b></center>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Phone number:</label>
    <center><input type="tel" className="form-control" name="phone"  value={user[0]?.phone} onChange={OnChange} style={{width:'1000px'}}/></center>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email Address:</label>
    <center> <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={user[0]?.email} onChange={OnChange} style={{width:'1000px'}}/></center>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Address:</label>
    <center><b><input type="name" className="form-control" name="address" value={user[0]?.address} onChange={OnChange} style={{width:'1000px'}} /></b></center>
  </div>
 
  <button type="submit" className="btn btn-primary" onClick={Update}>Insert</button>

  </center>
        </form>
    </div>
  )
}
