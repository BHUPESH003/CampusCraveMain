import React, { useState } from 'react'
import VendorDashboard from '../VendorDashboard/VendorDashboard'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import VendorOrders from '../VendorOrders/VendorOrders'
import ManageRestaurantForm from '../../forms/manage-restaurant-form/ManageRestaurantForm';

export default function VendorProfile() {
    const [activeTab, setActiveTab] = useState("first");

    const handleTabSelect = (selectedTab) => {
        if (selectedTab) {
          setActiveTab(selectedTab);
        }
      };
  return (
    <div>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="first"
          onSelect={handleTabSelect}
        >
          <Row className="m-0 text-body heading">
            <Col
              sm={3}
              className="d-md-flex  flex-column align-items-center justify-content-center"
            >
              <Nav
                // variant="tabs"
                className=" d-flex flex-column"
                style={{ borderRight: "1px solid #000" }}
              >
                <Nav.Item className="mt-3 sub-heading">
                  <Nav.Link
                    eventKey="first"
                    className={`text-body ${
                      activeTab === "first" ? "fw-bolder" : ""
                    }`}
                  >
                    Dashboard
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mt-3 sub-heading">
              <Nav.Link
                eventKey="second"
                className={`text-body ${activeTab === "second" ? "fw-bolder" : ""
                  }`}
              >
                Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-3 sub-heading">
              <Nav.Link
                eventKey="third"
                className={`text-body ${activeTab === "third" ? "fw-bolder" : ""
                  }`}
              >
                Manage Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-3 sub-heading">
              <Nav.Link
                eventKey="fourth"
                className={`text-body ${activeTab === "fourth" ? "fw-bolder" : ""
                  }`}
              >
                Log Out
              </Nav.Link>
            </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content className=" d-flex flex-column justify-content-center "  >
                <Tab.Pane eventKey="first" >
                  <VendorDashboard />
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="py-3">
              <VendorOrders />
            </Tab.Pane>
            <Tab.Pane eventKey="third" className="py-3">
              <ManageRestaurantForm />
            </Tab.Pane>
            <Tab.Pane eventKey="fourth" className="py-3">
              
            </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
    </div>
  )
}
