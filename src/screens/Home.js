import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
const xy={
  backgroundColor:'white',
  opacity: ' 1'
}



export default function Home() {

  const [sech, setSearch] = useState('');
  const [cant_names, setCan_names] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      }
    });
    response = await response.json();

    setFoodItem(response[0]);
    setCan_names(response[1]);


    // console.log(response[0], response[1]);
  }
  useEffect(() => {
    loadData()

  }, [])












  return (

    <div style={xy}>



      <div>
        <Navbar />
      </div>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={sech} onChange={(e)=>{setSearch(e.target.value)}}/>
              {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active ">
            <img src="https://source.unsplash.com/random/900×700/?burger" style={{ filter: "brightness(30%)" }} className="d-block w-100"  alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?maggi" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?cookie" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div>

      </div>
      <div className='container'>
        {

          cant_names !== []
            ? cant_names.map((data) => {
              return (<div className='row mb-3'>
                <div key={data._id} className="fs-3 m-3"> 
                  {data.CategoryName}
                </div>
                <hr />

                {foodItem !== []
                  ?
                  foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(sech.toLocaleLowerCase()))).map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Cards foodItem = {filterItems}
                          options={filterItems.options[0]}
                        
                        >

                        </Cards>
                      </div>
                    )
                  })
                  : <div>No such data found</div>
                }
              </div>
              )
            }

            ) : ""
          }

      </div>



      <div>
        <Footer />
      </div>

    </div>

  )
}

