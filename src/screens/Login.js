import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const stylel={
    
    borderRadius:'25px', 
    width: '510px',
    height:'380px',
    backgroundColor:'#4e4343c2',
   
  padding: '10px',
  border: '5px ',
  margin:'auto'
  
}
const box={
    
    overflow:'hidden',
    margin : '110px'
}
export default function Login() {
  const [credentials, setcredentials] = useState({email: "", password: "" })
  let navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials");
        }
        if (json.success) {
            localStorage.setItem("userEmail",credentials.email);
            localStorage.setItem("authToken",json.authToken);
            console.log(localStorage.getItem("authToken"))
          navigate("/"); 
      }





    }
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
  return (
    <div style={box}>
      
      <div className="container mt-4 p-3 " style={stylel}>

<form onSubmit={handleSubmit}>
    
    <div className="mb-3">
        <label htmlfor="exampleInputEmail1" className="form-label text-white fw-bold mt-3 ">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name='email' value={credentials.email} onChange={onChange} />
        <div id="emailHelp" className="form-text text-white fw-bold">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
        <label htmlfor="exampleInputPassword1" className="form-label mt-3 text-white fw-bold">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1"
            name='password' value={credentials.password} onChange={onChange} />
    </div>

    <button type="submit" className="m-3 btn btn-primary">Submit</button>
    <Link to="/CreateUser" className="m-3 btn btn-danger" >New User </Link>
</form>


</div>

    </div>
  )
}
