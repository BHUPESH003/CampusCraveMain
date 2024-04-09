import axios from "axios";
import React, { useState, useEffect } from "react";
import image from "../../assets/food_1.png";
import { Link, useNavigate } from "react-router-dom";
import CategorySlider from "./CategorySlider";
import { env } from "../../../env";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch categories from the backend API
    axios
      .get(`${env.baseUrl}/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  
  console.log(categories);
  return (
    //     <div className="container-fluid">
    //   {/* <ul  className='row list-unstyled d-flex justify-content-center'> */}
    //     {categories.map((category, index) => (
    //       <Link to={`/category/${category.id}`}>
    //       <button className='border mx-2 align-items-center rounded-pill col-2 d-flex ' >
    //       <img style={{width : '2vw'}} className='rounded-circle ' src={image} alt={category} />
    //       <span style={{fontSize : '1.5vw'}}>{category.category_name}</span>
    //     </button>
    //     </Link>
    //     ))}

    // </div>
    <CategorySlider data={categories} heading="What's on Your Mind" />
  );
}
