import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { socialLinksLogin } from "../../Data/Links";
import CIcon from "@coreui/icons-react";
import { env } from "../../../env";
export default function SignUp() {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone_no: "",
    userType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${env.baseUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed"); // or handle specific error cases
      }

      // Registration successful
      console.log("User registered successfully");
      navigate('/login')
      // Redirect or navigate to another page after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error (e.g., display error message)
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row d-block d-sm-flex">
        <div className="d-flex d-sm-none flex-column align-items-center justify-content-center bg-color text-light mb-4 rounded">
          <h3>Sign Up</h3>
          <span>Please sign up for a new account</span>
        </div>
        <div className="col-md-6 d-none d-sm-flex flex-column align-items-center justify-content-center bg-color text-light  rounded">
          <h3>Sign Up</h3>
          <span>Please sign up for a new account</span>
        </div>

        <div className="col-md-6 px-3">
          <div className="d-flex flex-column align-items-center justify-content-center border border-5 rounded p-3 ">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhoneNo">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter phone number"
                  name="phone_no"
                  value={formData.phone_no}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUserType">
                <Form.Label>User Type</Form.Label>
                <Form.Select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select User Type</option>
                  <option value="Student">Student</option>
                  <option value="Vendor">Vendor</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex align-items-center justify-content-center">
                <Button variant="primary" type="submit" className="w-75">
                  Sign Up
                </Button>
              </div>
            </Form>

            <span className="mt-5">
              Already have an account ?{" "}
              <span>
                <Link to="/" className="text-color text-decoration-none">
                  Log In
                </Link>
              </span>
            </span>
            <span className="mt-3">Or</span>
            <div className="mt-3">
              {socialLinksLogin.map((item) => (
                <a
                  href={item.link}
                  className="text-body cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item.name}
                >
                  <CIcon
                    icon={item.icon}
                    key={item.name}
                    className="mx-3"
                    size="xxl"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
