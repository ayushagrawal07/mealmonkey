import React from 'react'
import axios from 'axios'


import { useCart, useDispatchCart } from '../components/ContextReducer';
import trash from "../trash.svg"

const xy={
  overflow:'scroll',
  height:'500px'
  

 }
 


export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
      </div>
    )
  } 
  const handleOpenRazorpay=async(data)=>{
    const options={
      key :'rzp_test_xYfAJoeJTqF0sK',
      amount:Number(data.amount),
      currency:data.currency,
      name:'mealmonkey',
      description : 'xyz',
      order_id : data.id,
handler:function(response){
  

  console.log(response,"53")
  axios.post('http://localhost:5000/verify',{response:response})
  .then(res=>{
    handleCheckOut()
    console.log(res,"56")

  })
  .catch(err=>{
    console.log(err)
  })

}
    }
      const rzp=new window.Razorpay(options)
      rzp.open()
    
  }
  const handlePayment=async(amount)=>{
    const data={amount:amount}
    axios.post ('http://localhost:5000/orders',data)
    .then(res=>{
      console.log(res.data,"64")
      handleOpenRazorpay(res.data.data)
      

      

    })
    .catch(err=>{
      console.log(err)
    })
     
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

   const handleCheckOut = async () => {
     let userEmail = localStorage.getItem("userEmail");
    console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orderData", {
    method: 'POST',
       headers: {
        'Content-Type': 'application/json'
      },
   body:JSON.stringify({
      order_data: data,
        email: userEmail,
         order_date: new Date().toDateString()
      })
    });
  console.log("JSON RESPONSE:::::", response)
    if (response.status === 200) {
     dispatch({ type: "DROP" })
   }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div style={xy}>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'  >
        <table className='table table-hover'  >
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody className='text-white'  >
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0">
                    <img src={trash} alt="delete" onClick ={() => {dispatch({type:"REMOVE",index:index})}} /> </button> </td></tr>
  )) }
          </tbody>
        </table>
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={()=> handlePayment(totalPrice)} >Pay Now </button>
        </div>
      </div>



    </div>
  )
}