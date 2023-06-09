import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
const stylel={
    borderRadius:'25px', 
    width: '510px',
    height:'380px',
    
    backgroundColor:'#4e4343c2',
  padding: '10px',
  
  margin:'auto'
  
}
const box={
    overflow:'hidden',
    margin : '110px'
}

export default function SignUp() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/creatuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password})
        })
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials");
        }


    }
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div  style={box}>
            <div className="container" style={stylel}>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlfor="name" className="form-label fw-bold text-white">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlfor="exampleInputEmail1" className="form-label fw-bold text-white">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text fw-bold text-white">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlfor="exampleInputPassword1" className="form-label fw-bold text-white">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            name='password' value={credentials.password} onChange={onChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger" >Already a User </Link>
                </form>


            </div>

        </div>
    )
}
