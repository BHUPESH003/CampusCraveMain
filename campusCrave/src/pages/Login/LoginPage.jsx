import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { socialLinksLogin } from "../../Data/Links";
import CIcon from "@coreui/icons-react";
import { useUser } from "../../UserContext";
export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState(null);
  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:3000/api/v1/user/login', {
  //       email,
  //       password,
  //     });

  //     // Assuming the backend responds with user data on successful login
  //     const userData = response.data;

  //     //  Set the user in the context
  //     setUser(userData.user.username);
  //     console.log(setUser);
  //     navigate("/");
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed"); // or handle specific error cases
      }

      const data = await response.json();
      

      localStorage.setItem("token", data.token);
      navigate('/')
      // Redirect or navigate to another page
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message)
      // Handle login error (e.g., display error message)
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row d-block d-sm-flex">
        <div
          className="d-flex  d-sm-none flex-column align-items-center justify-content-center bg-color text-light mb-4 rounded"
          style={{ height: "300px" }}
        >
          <h3 className="heading">Log In</h3>
          <span className="sub-heading">Please sign in to your existing account</span>
        </div>
        <div className="col-md-6 d-none d-sm-flex flex-column align-items-center justify-content-center bg-color text-light  rounded">
          <h3 className="heading">Log In</h3>
          <span className="sub-heading"> Please sign in to your existing account</span>
        </div>

        <div className="col-md-6 px-3">
          <div className="d-flex flex-column align-items-center justify-content-center border border-5 rounded p-3 ">
            <Form>
              <Form.Group className="mb-3  sub-body-font " controlId="formBasicEmail">
                <Form.Label className="body-font">Email address</Form.Label>
                <Form.Control
                  onChange={(ev) => setEmail(ev.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted body-font">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 sub-heading" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(ev) => setPassword(ev.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3 heading" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <div className="d-flex align-items-center justify-content-center">
                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  type="submit"
                  className="w-75 fw-bold"
                >
                 Log In
                </Button>
              </div>
            </Form>
            {error && <Alert className="sub-body-font border-0 mt-3" variant="danger">Invalid email or incorrect Password</Alert>}
            <span className="mt-5 body-font">
              Don't have an account ?{" "}
              <span>
                <Link to={'/signup'} className="text-color text-decoration-none body-font">
                  SIGN UP
                </Link>
              </span>
            </span>
            <span className="mt-3 body-font">Or</span>
            <div className="mt-3 ">
              {socialLinksLogin.map((item) => (
                <a
                  href={item.link}
                  className="text-body cursor-pointer"
                  target="_blank"
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
