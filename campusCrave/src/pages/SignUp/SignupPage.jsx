import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
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
  // const [formErrors, setFormErrors] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // const validateForm = () => {
  //   const errors = {};
  //   if (!formData.email) {
  //     errors.email = "Email is required";
  //   }
  //   if (!formData.username) {
  //     errors.username = "Username is required";
  //   }
  //   if (!formData.password) {
  //     errors.password = "Password is required";
  //   }
  //   if (!formData.phone_no) {
  //     errors.phone_no = "Phone number is required";
  //   }
  //   if (!formData.userType) {
  //     errors.userType = "UserType is required";
  //   }
  //   // Add more validation checks for other fields
  //   setFormErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

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
        setErrors({email : "Email already exists . "})
        // Handle registration error (e.g., display error message)
      }

    
    
  };

  const validateEmail = (email) => {
    // Email regex pattern
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  // Validation function for password
  const validatePassword = (password) => {
    // Password regex pattern
    const pattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{6,}$/;
    return pattern.test(password);
  };

  // Validation function for phone number
  const validatePhoneNumber = (phone) => {
    // Phone number regex pattern
    const pattern = /^\d{10}$/;
    return pattern.test(phone);
  };

  // Validation function for username
  const validateUsername = (username) => {
    // Username regex pattern
    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(username);
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!validateEmail(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!validatePassword(formData.password)) {
      errors.password =
        "Password must be at least 6 characters long and include at least one alphabet, one digit, and one special character";
    }

    if (!validatePhoneNumber(formData.phone_no)) {
      errors.phone_no = "Invalid phone number";
    }

    if (!validateUsername(formData.username)) {
      errors.username = "Username should contain only alphabets";
    }

    setErrors(errors);

    // If no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      handleSubmit(e);
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row d-block d-sm-flex">
        <div className="d-flex d-sm-none flex-column align-items-center justify-content-center bg-color text-light mb-4 rounded">
          <h3 className="heading">Sign Up</h3>
          <span className="sub-heading">Please sign up for a new account</span>
        </div>
        <div className="col-md-6 d-none d-sm-flex flex-column align-items-center justify-content-center bg-color text-light  rounded">
          <h3 className="heading">Sign Up</h3>
          <span className="sub-heading">Please sign up for a new account</span>
        </div>

        <div className="col-md-6 px-3 ">
          <div className="d-flex flex-column align-items-center justify-content-center border border-5 rounded p-3 ">
            <Form onSubmit={handleFormSubmit} style={{width:'300px'}}>
              <Form.Group className="mb-3 sub-body-font " controlId="formBasicEmail">
                <Form.Label className="body-font">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <Alert className='sub-body-font border-0 mt-3' variant="danger">{errors.email}</Alert>}
                <Form.Text className="text-muted ">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3 sub-heading" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  
                />
                {errors.username && <Alert className='sub-body-font border-0 mt-3' variant="danger">{errors.username}</Alert>}
              </Form.Group>
              <Form.Group className="mb-3 sub-heading" controlId="formBasicPhoneNo">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter phone number"
                  name="phone_no"
                  value={formData.phone_no}
                  onChange={handleChange}
                  required
                />
                {errors.phone_no && <Alert className='sub-body-font border-0 mt-3' variant="danger">{errors.phone_no}</Alert>}
              </Form.Group>
              <Form.Group className="mb-3 sub-heading" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  
                  onChange={handleChange}
                  required
                />
                {errors.password && <Alert className='sub-body-font border-0 mt-3' variant="danger">{errors.password}</Alert>}
              </Form.Group>
              <Form.Group className="mb-3 sub-heading" controlId="formBasicUserType">
                <Form.Label>User Type</Form.Label>
                <Form.Select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                >
                  <option className="body-font" value="">Select User Type</option>
                  <option className="body-font" value="Student">Student</option>
                  
                </Form.Select>
                {errors.userType && <Alert className='sub-body-font border-0 mt-3' variant="danger">{errors.userType}</Alert>}
              </Form.Group>

              <div className="d-flex align-items-center justify-content-center text-white fw-bold">
                <Button variant="primary" type="submit" className="w-75">
                  Sign Up
                </Button>
              </div>
            </Form>

            <span className="mt-5 body-font">
              Already have an account ?{" "}
              <span>
                <Link to="/login" className="text-color text-decoration-none body-font">
                  Log In
                </Link>
              </span>
            </span>
            <span className="mt-3 body-font">Or</span>
            <div className="mt-3 body-font">
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
