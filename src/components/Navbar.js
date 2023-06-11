import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart';


export default function Navbar() {
  const [cartView,setcartView]=useState(false)
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigate("/")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-secondary" >
        <div className="container-fluid">
          <Link className="navbar-brand fs-4 fst-italic text-warning" to="/">mealmonkey </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="btn bg-dark text-white mx-1 nav-link active " aria-current="page" to="/">Home</Link>
              </li>
            {/* {(localStorage.getItem("authToken"))?
            <li classname="nav-item">
              <Link className="btn bg-dark text-white mx-1 nav-link active " aria-current="page" to="/myOrderData">My Order</Link>
            </li>
            : ""
          }   */}
              


            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>

                <Link className="btn bg-dark text-white mx-1" to="/login">Login
                </Link>


                <Link className="btn bg-dark text-white mx-1" to="/CreateUser">SignUp
                </Link>

              </div>
              :
              <div>
                <div className='btn bg-dark text-white mx-2' onClick={()=>{setcartView(true)}}>
                🛒 My Cart

                </div>
                {cartView?<Modal onClose={()=>setcartView(false)}><Cart/></Modal>:null}

                <div className='btn bg-dark text-danger mx-2' onClick={handlelogout}>
                  Logout

                </div>
              </div>

            }
          </div>
        </div>
      </nav>
    </div>
  )
}
