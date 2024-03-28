import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { socialLinksLogin } from "../../Data/Links";
import CIcon from "@coreui/icons-react";
export default function LoginPage() {
  return (
    <div className="container-fluid p-0 m-0">
      <div className="row d-block d-sm-flex">
        <div
          className="d-flex d-sm-none flex-column align-items-center justify-content-center bg-color text-light mb-4 rounded"
          style={{ height: "300px" }}
        >
          <h3>Log In</h3>
          <span>Please sign in to your existing account</span>
        </div>
        <div className="col-md-6 d-none d-sm-flex flex-column align-items-center justify-content-center bg-color text-light  rounded">
          <h3>Log In</h3>
          <span>Please sign in to your existing account</span>
        </div>

        <div className="col-md-6 px-3">
          <div className="d-flex flex-column align-items-center justify-content-center border border-5 rounded p-3 ">
            <Form >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <div className="d-flex align-items-center justify-content-center">
                <Button variant="primary" type="submit" className="w-75">
                  Submit
                </Button>
              </div>
            </Form>

            <span className="mt-5">
              Don't have an account ?{" "}
              <span>
                <Link className="text-color text-decoration-none">SIGN UP</Link>
              </span>
            </span>
            <span className="mt-3">Or</span>
            <div className="mt-3">
              {socialLinksLogin.map((item) => (
                <a href={item.link} className="text-body cursor-pointer" target="_blank">
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
