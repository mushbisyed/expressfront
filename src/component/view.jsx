import React, { useState } from 'react'
import  Axios from 'axios'
import { useEffect,usestate } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export default function View() {
  const [display,setDisplay]=useState([]);
  const [deleteId,setDeleteId]=useState('');
  let nav=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      nav("/login")
    }
    else{
    Axios.get("http://localhost:5000/api/employe/get_employee",{headers:{"auth-token":localStorage.getItem("token")}})
    .then((res)=>{   //.then is try and catch block
       console.log(res)
       setDisplay(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }},[])
  console.log(deleteId);

  const Delete=()=>{
    Axios.delete(`http://localhost:5000/api/employe/delete_employee/${deleteId}`)
    .then((res)=>{
      console.log(res)
      let newDisplay=display.filter((item)=>{ 
        return item._id!==deleteId
      })
      setDisplay(newDisplay)
    })
      
    .catch((err)=>{
      console.log(err)
    })
  }
  const Logout=()=>{
    localStorage.removeItem("token");
    nav('/login')
  }
  return (
    <div>
      <center><h1>View</h1></center>
      <Link to="/insert" className='btn btn-primary'>Insert</Link>
      <button onClick={Logout} className="btn btn-danger">logout</button><br/>
      <table border={1}>
        <thead>
      <tr>
        <th>SLno.</th>
        <th>name</th>
        <th>phone no</th>
        <th>email</th>
        <th>Address</th>
        <td>Edit</td>
       
        <td>Delete</td>
        
       
      </tr></thead>
      <tbody>
    {display.map((item,index)=>{return(
     
      <tr key={index}>
          <td>{index+1}</td>
          
          <td>{item.name}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>{item.address}</td> 
          <td><Link to={`update/${item._id}`}>EDIT</Link></td>
          <td><button  data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>setDeleteId(item._id)}>Delete</button></td>
           
        </tr>
       
    )})}
    
    </tbody>
    
    </table>
    


<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        are u sure!!
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={Delete} >yes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}