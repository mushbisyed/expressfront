import Axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const host = "http://localhost:5000/"

    let navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault();
        Axios.post(`${host}api/mgt/login`, { email: email, password: password })
            .then((res) => {
                console.log(res)
                if (res.data.success == true) {
                    alert("Login Successfully")
                    localStorage.setItem("token", res.data.authtoken)
                    navigate('/')
                }

                else {
                    console.log("some error occured")
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
                    <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Login</h2>

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