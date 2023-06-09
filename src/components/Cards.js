import React, { useRef, useState,useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
const xy={
  
  boxShadow:'0 8px 16px 0'
}
export default function Cards(props) {

  let dispatch = useDispatchCart();
  let data = useCart()
  const priceRef=useRef();
  let options = props.options;
  let priceOptions = Object.keys(options)
  const [qty, setqty] = useState(1)
  const [size, setsize] = useState("")

  let finalPrice = qty * parseInt(options[size]);
  

  const handleAddtoCart = async () => {
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price:finalPrice, qty: qty, size: size })
    console.log(data)
  }
  useEffect(()=>{
    setsize(priceRef.current.value)
  },[])
 
  return (

    <div>
      <div>
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            
            <div className='container w=100'>
              <select className='m-2 h-100 bg-warning rounded' onChange={(e) => setqty(e.target.value)}>
                {
                  Array.from(Array(6), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    )
                  })}

              </select>
              <select className='m-2 h-100 bg-warning rounded' ref={priceRef} onChange={(e) => setsize(e.target.value)}>
                {
                  priceOptions.map((data) => {
                    return <option key={data} value={data}>{data}</option>
                  })
                }

              </select>
              <div className='d-inline fs-5 h-100'>
                ₹{finalPrice}/-
              </div>
            </div>
            <hr>
            </hr>
            <button className={'btn btn-warning justify-content-center ms-2'} style={xy} onClick={handleAddtoCart}>Add+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
