import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import image from '../../assets/food_1.png'
import { Link } from 'react-router-dom'
import { Model } from 'mongoose'
export default function MyOrders(props) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
   
    <div className="row border-bottom border-2 my-2  " >
      <div className="col-9 align-self-center">
        <div>
          <span className="body-font fw-bold">VendorName</span> <br />
          <span className="d-flex justify-content-between">
          <Button className='border-0 bg-white' onClick={handleShowModal}><span className="body-font border border-1 border-warning rounded text-warning fw-bold">View Details</span></Button>
            <span className="body-font text-muted fw-semibold">{props.price} </span>
           

            <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header >
          <Modal.Title>
          Order Number - #{props.id}
          </Modal.Title>
          
        </Modal.Header>
        <Modal.Body className='m-3'>
          <div className='row'>
          <div className='body-font text-end text-muted'>{props.order_time}</div>
          </div>
          
          <div className='fw-bold row  text-muted sub-heading '>Items</div>
          {props.items.map((item)=>{
            return <div className=' row m-2 sub-heading' key={item.item_id}>
                  <div className='col-6 text-start'>{item.item_name} x {item.quantity}</div>
                  <div className="col-6 text-end">Rs {item.item_price*item.quantity}</div>
            </div>
          })}
          <div className='border-top border-1 m-2  sub-heading border-danger row'>
            <div className='col-6 text-start'>Paid via Credit/Debit</div>
            <div className='col-3 text-center fw-bold '>Bill Total </div>
            <div className='col-3 text-end'>Rs {props.price}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
            
            {/* <Button
              className="bg-light text-black border-1 border-secondary rounded"
              
            >
              <span style={{ fontSize: "1.2rem" }}>Reorder</span>
            </Button> */}
          </span>
        </div>
        <div className="body-font">
          {props.items.map((item)=>{
           return  <span key={item.item_id} className='body-font text-muted'>{item.item_name} x {item.quantity}{"  "}</span>
          })}
        </div>
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

