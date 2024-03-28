import { cibReadTheDocs, cilCreditCard, cilHeart, cilSettings } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React, { useState } from 'react'
import CartItem from '../../Components/CartItem/CartItem'
import MyOrders from '../MyOrders/MyOrders'
import Favourites from '../Favourites/Favourites'
import Payments from '../Payments/Payments'
import Settings from '../Settings/Settings'
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

export default function MyAccount() {
    const [activeTab, setActiveTab] = useState("first");
    const handleTabSelect = (selectedTab) => {
        if (selectedTab) {
          setActiveTab(selectedTab);
        }
      };
  return (
    <div className='bg-primary text-white ' >
        
            <div className='row p-4 ' >

                <div className='col-6  text-center'>
                <span style={{fontSize:"2rem" , fontFamily:"cursive"}} ><b>User Name</b></span><br/>
                <span className='m-5' style={{fontFamily:"cursive"}}>Phone No </span>
                <span style={{fontFamily:"cursive"}}>Email ID</span>
                </div>
                <div className=' col-6 text-center align-self-center' >
                    <button type='button' className='btn btn-primary border'> Edit Profile</button>
                </div>

            </div>
            <div className='cart mx-5'>
                {/* <div className='m-5 row'>
                    <div className='col-3  bg-dark'>
                        <div className='row p-4 '><CIcon icon={cibReadTheDocs} /> Orders</div>
                        <div className='row p-4'><CIcon icon={cilHeart} />Favourites</div>
                        
                        <div className='row p-4'><CIcon icon={cilCreditCard} />Payments</div>
                        <div className='row p-4'><CIcon icon={cilSettings} />Settings</div>
                    </div>
                    <div className='bg-white col'>
                        <CartItem/>
                    </div>
                </div> */}
                <Tab.Container
      id="left-tabs-example"
      defaultActiveKey="first"
      onSelect={handleTabSelect}
    >
      
      <Row className="m-0 text-body">
        <Col
          sm={3}
          className="d-md-flex flex-column align-items-center justify-content-center"
        >
          <Nav
            // variant="tabs"
            className=" d-flex flex-column"
            style={{ borderRight: "1px solid #000" }}
          >
            <Nav.Item className="mt-3">
              <Nav.Link
                eventKey="first"
                className={`text-body ${activeTab === "first" ? "fw-bolder" : ""
                  }`}
              >
                My Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-3">
              <Nav.Link
                eventKey="second"
                className={`text-body ${activeTab === "second" ? "fw-bolder" : ""
                  }`}
              >
                Favourites
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-3">
              <Nav.Link
                eventKey="third"
                className={`text-body ${activeTab === "third" ? "fw-bolder" : ""
                  }`}
              >
                Payments
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-3">
              <Nav.Link
                eventKey="fourth"
                className={`text-body ${activeTab === "fourth" ? "fw-bolder" : ""
                  }`}
              >
                Settings
              </Nav.Link>
            </Nav.Item>
            
            </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content className="w-85 d-flex flex-column justify-content-center">
            <Tab.Pane eventKey="first" className="py-3">
              <MyOrders />
            </Tab.Pane>
            <Tab.Pane eventKey="second" className="py-3">
              <Favourites />
            </Tab.Pane>
            <Tab.Pane eventKey="third" className="py-3">
              <Payments />
            </Tab.Pane>
            <Tab.Pane eventKey="fourth" className="py-3">
              <Settings/>
            </Tab.Pane>
            
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
            </div>
        
    </div>
  )
}
