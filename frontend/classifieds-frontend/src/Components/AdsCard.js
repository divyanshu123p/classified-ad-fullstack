import React from 'react'

export default function Ads(props) {
  return (
        <div className="card" style = {{height:"50px", width:"250px", margin:"10px"}}>
        <img className="card-img-top" src= {`http://localhost:5500/${props.imglink}`} alt="Card image cap"/>
            <div>
                <h3 className="card-title">{props.title}</h3>
            </div>
        <p style={{margin:'10px'}} >{props.description}</p>
        <h4 style={{margin:'10px'}} > Rs {props.price}</h4>
        <p style={{margin:'10px'}} > Address: {props.address}</p>
        <h5 style={{margin:'10px'}} > Phone Number: {props.phonenum}</h5>
        <p style={{margin:'10px'}} > Email: {props.email}</p>

        </div>
  )
}
