import {useEffect} from "react";
import { Route,Redirect, Navigate, Outlet, useNavigate, useLocation} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

const ProtectedRouteUser = (props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  if (!token) return <Navigate to="/" />;

  useEffect(()=>{
    if(token && jwtDecode(token).userType!== "Student"){ 
      presentPage()
      }
  },[token && jwtDecode(token).userType!== "Student"])

  const decodedData = jwtDecode(token);


  if (decodedData.userType === "Student") {
    return <Outlet {...props} />;
  }
 else if(decodedData.userType!=="Vendor"){
   presentPage()
  }
};

export default ProtectedRouteUser;