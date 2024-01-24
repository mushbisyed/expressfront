import Axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate()

    const host = "http://localhost:5000/"

    const onSubmit = (e) => {
        e.preventDefault();
        Axios.post(`${host}api/mgt/register`, { name: name, email: email, password: password })
            .then((res) => {
                console.log("Register : " + res)
                if (res.data.success == true) {
                    console.log("Register Successfully")
                    navigate('/login')
                }

               
            })
            .catch((err) => {
                alert(err)
                console.log("Error frontend: " + err)
            })
    }


    return (
        <>
            <div style={{ marginTop: "100px" }}>
                <form onSubmit={onSubmit} method="POST" style={{ width: "500px", marginRight: "auto", marginLeft: "auto" }}>
                    <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Register</h2>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label"> Name</label>
                        <input type="text" className="form-control" name="name" onChange={(e) => setName(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="a" className="form-label">Email</label>
                        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="a" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="b" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="b" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </>
    )
}
