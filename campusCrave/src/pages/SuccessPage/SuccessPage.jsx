import React from "react";
import { Button } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilCheck } from "@coreui/icons";
import image from "../../assets/Success.jpg";
import { Link } from "react-router-dom";
export default function SuccessPage() {
  return (
    <div className="text-center mb-5">
      <div className="row text-center ">
        <img
          className="text-center"
          src={image}
          style={{ width: "1200px", height: "400px" }}
        /> 
      </div>
      <span className="heading  text-center">Payment Successful</span>
      <br />
      <span className="sub-heading text-muted fw-bold ">
        Thank you for your payment . An automated payment receipt will be sent
        to your registered email.
      </span>
      <br />
      <Link to="/" className="body-font">
        Back to home
      </Link>
    </div>
  );
}
