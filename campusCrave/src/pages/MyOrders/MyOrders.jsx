import React from 'react'
import { Button } from 'react-bootstrap'
import image from '../../assets/food_1.png'
export default function MyOrders() {
  return (
    <div className="row border-bottom border-2 my-2 overflow-auto " style={{maxWidth: "1400px", maxHeight:"300px" }}>
      <div className="col-9 align-self-center">
        <div>
          <span className="body-font fw-bold">Item Name</span> <br />
          <span className="d-flex justify-content-between">
          <span className="body-font text-muted fw-semibold">Quantity </span>
            <span className="body-font text-muted fw-semibold">₹ Price </span>
            
            
            <Button
              className="bg-light text-black border-1 border-secondary rounded"
              
            >
              <span style={{ fontSize: "1.2rem" }}>Reorder</span>
            </Button>
          </span>
        </div>
        <div className="body-font">VendorName</div>
      </div>
      <div className="col-3 d-flex align-items-center justify-content-center  position-relative">
        <img
          src={image}
          // src={props.image_url}

          alt=""
          style={{ width: "55%", height: "65%" }}
          className="rounded"
        />
        {/* <Button style={{width:'5vw',left:'45vw',top:'100vw'}} className='bg-light text-black  position-absolute  translate-middle-x translate-middle-y p-2 border border-success'><span className="body-font fw-bold m-2 ">ADD</span><CIcon className="mt-2" icon={cilPlus} size="xxl" /></Button> */}
      </div>
      <div className="col-9 align-self-center">
        <div>
          <span className="body-font fw-bold">Item Name</span> <br />
          <span className="d-flex justify-content-between">
          <span className="body-font text-muted fw-semibold">Quantity </span>
            <span className="body-font text-muted fw-semibold">₹ Price </span>
            
            
            <Button
              className="bg-light text-black border-1 border-secondary rounded"
              
            >
              <span style={{ fontSize: "1.2rem" }}>Reorder</span>
            </Button>
          </span>
        </div>
        <div className="body-font">VendorName</div>
      </div>
      <div className="col-3 d-flex align-items-center justify-content-center  position-relative">
        <img
          src={image}
          // src={props.image_url}

          alt=""
          style={{ width: "55%", height: "65%" }}
          className="rounded"
        />
        {/* <Button style={{width:'5vw',left:'45vw',top:'100vw'}} className='bg-light text-black  position-absolute  translate-middle-x translate-middle-y p-2 border border-success'><span className="body-font fw-bold m-2 ">ADD</span><CIcon className="mt-2" icon={cilPlus} size="xxl" /></Button> */}
      </div>
      <div className="col-9 align-self-center">
        <div>
          <span className="body-font fw-bold">Item Name</span> <br />
          <span className="d-flex justify-content-between">
          <span className="body-font text-muted fw-semibold">Quantity </span>
            <span className="body-font text-muted fw-semibold">₹ Price </span>
            
            
            <Button
              className="bg-light text-black border-1 border-secondary rounded"
              
            >
              <span style={{ fontSize: "1.2rem" }}>Reorder</span>
            </Button>
          </span>
        </div>
        <div className="body-font">VendorName</div>
      </div>
      <div className="col-3 d-flex align-items-center justify-content-center  position-relative">
        <img
          src={image}
          // src={props.image_url}

          alt=""
          style={{ width: "55%", height: "65%" }}
          className="rounded"
        />
        {/* <Button style={{width:'5vw',left:'45vw',top:'100vw'}} className='bg-light text-black  position-absolute  translate-middle-x translate-middle-y p-2 border border-success'><span className="body-font fw-bold m-2 ">ADD</span><CIcon className="mt-2" icon={cilPlus} size="xxl" /></Button> */}
      </div>
      <div className="col-9 align-self-center">
        <div>
          <span className="body-font fw-bold">Item Name</span> <br />
          <span className="d-flex justify-content-between">
          <span className="body-font text-muted fw-semibold">Quantity </span>
            <span className="body-font text-muted fw-semibold">₹ Price </span>
            
            
            <Button
              className="bg-light text-black border-1 border-secondary rounded"
              
            >
              <span style={{ fontSize: "1.2rem" }}>Reorder</span>
            </Button>
          </span>
        </div>
        <div className="body-font">VendorName</div>
      </div>
      <div className="col-3 d-flex align-items-center justify-content-center  position-relative">
        <img
          src={image}
          // src={props.image_url}

          alt=""
          style={{ width: "55%", height: "65%" }}
          className="rounded"
        />
        {/* <Button style={{width:'5vw',left:'45vw',top:'100vw'}} className='bg-light text-black  position-absolute  translate-middle-x translate-middle-y p-2 border border-success'><span className="body-font fw-bold m-2 ">ADD</span><CIcon className="mt-2" icon={cilPlus} size="xxl" /></Button> */}
      </div>
    </div>
  )
}

