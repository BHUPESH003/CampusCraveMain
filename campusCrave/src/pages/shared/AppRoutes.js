import React from "react";
import SearchBar from "../../Components/SearchBar/SearchBar.jsx";
 const  SuccessPage = React.lazy(()=>import("../SuccessPage/SuccessPage.jsx"))  ;
// import CheckOut from "../CheckOut/CheckOut.jsx";
const CheckOut=React.lazy(()=> import('../CheckOut/CheckOut.jsx'))
const MyAccount = React.lazy(()=> import("../MyAccount/MyAccount.jsx")) ;
const VendorPage = React.lazy(()=>import("../VendorPage/VendorPage.jsx") )
const CategoryDetails = React.lazy(()=>import("../Category/CategoryDetails.jsx"))  ;

const ManageRestaurantForm = React.lazy(()=> import("../../forms/manage-restaurant-form/ManageRestaurantForm.jsx"))
const Home = React.lazy(() => import("../Home/Home.jsx"));
const Login = React.lazy(() => import("../Login/LoginPage.jsx"));


const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/login", exact: true, name: "Login", component: Login },
  { path: "/manage-food-court" , exact : true , name :"ManageRestaurantForm" , component : ManageRestaurantForm},
  { path: "/category/:categoryId" , exact : true , name :"CategoryId" , component : CategoryDetails},
  { path: "/search" , exact : true , name :"searchbar" , component : SearchBar},
  { path: "/checkout" , exact : true , name :"cart" , component : CheckOut},
  { path: "/vendor/:vendorId" , exact : true , name :"vendorDetails" , component : VendorPage},
  { path: "/my-account" , exact : true , name :"myaccount" , component : MyAccount},
  { path: "/success" , exact : true , name :"success" , component : SuccessPage},
  
  
];

export default routes;
