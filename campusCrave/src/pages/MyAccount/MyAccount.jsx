import {
  cibReadTheDocs,
  cilCreditCard,
  cilHeart,
  cilSettings,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { useEffect, useState } from "react";
import CartItem from "../../Components/CartItem/CartItem";
import MyOrders from "../MyOrders/MyOrders";
import Favourites from "../Favourites/Favourites";
import Payments from "../Payments/Payments";
import Settings from "../Settings/Settings";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { env } from "../../../env";

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState("first");
  const [orders, setOrders] = useState([]);

  const handleTabSelect = (selectedTab) => {
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  };

  async function fetchOrders(username) {
    try {
      const response = await fetch(`${env.baseUrl}/orders/${username}`); // Make request to backend endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  useEffect(() => {
    const verifyTokenAndProceedToMyProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login page or display a message
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:3000/verify-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Handle unauthorized access or invalid token
          // Redirect to login page or display a message
          return;
        }
        const { userName } = await response.json();
        fetchOrders(userName);
      } catch (error) {
        console.error(
          "Error verifying token and proceeding to checkout:",
          error
        );
      }
    };
    verifyTokenAndProceedToMyProfile();
  }, []);

  console.log(orders);

  return (
    <div className="bg-primary text-white ">
      <div className="row p-4 ">
        <div className="col-6  text-center heading ">
          <span style={{ fontFamily: "cursive" }} className="heading">
            User Name
          </span>
          <br />
          <span className="m-5" style={{ fontFamily: "cursive" }}>
            Phone No{" "}
          </span>
          <span style={{ fontFamily: "cursive" }}>Email ID</span>
        </div>
        {/* <div className=' col-6 text-center align-self-center ' >
                    <button type='button' className='btn btn-primary border '><span className='sub-heading'>Edit Profile</span> </button>
                </div> */}
      </div>
      <div className="cart mx-5">
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
                    My Orders
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item className="mt-3 sub-heading">
              <Nav.Link
                eventKey="second"
                className={`text-body ${activeTab === "second" ? "fw-bolder" : ""
                  }`}
              >
                Favourites
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-3 sub-heading">
              <Nav.Link
                eventKey="third"
                className={`text-body ${activeTab === "third" ? "fw-bolder" : ""
                  }`}
              >
                Payments
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-3 sub-heading">
              <Nav.Link
                eventKey="fourth"
                className={`text-body ${activeTab === "fourth" ? "fw-bolder" : ""
                  }`}
              >
                Settings
              </Nav.Link>
            </Nav.Item> */}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content className="w-85 d-flex flex-column justify-content-center">
                <Tab.Pane eventKey="first" className="py-3">
                  {orders.map((order) => (
                    <MyOrders {...order} />
                  ))}
                </Tab.Pane>
                {/* <Tab.Pane eventKey="second" className="py-3">
              <Favourites />
            </Tab.Pane>
            <Tab.Pane eventKey="third" className="py-3">
              <Payments />
            </Tab.Pane>
            <Tab.Pane eventKey="fourth" className="py-3">
              <Settings/>
            </Tab.Pane> */}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}
