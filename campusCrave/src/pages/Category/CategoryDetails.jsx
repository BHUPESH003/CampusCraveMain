import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FoodItem from "../../Components/FoodItem/FoodItem";
import { env } from "../../../env";
import { Alert } from "react-bootstrap";

export default function CategoryDetails() {
  const { categoryId } = useParams();
  console.log(categoryId);
  const [menuItems, setMenuItems] = useState([]);
  const [alertMessage , setAlertMessage] = useState(false);

const handleAlertMessage =(newState)=>{
  setAlertMessage(newState);
}

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          `${env.baseUrl}/categories/${categoryId}/menuItems`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        console.log(data)

        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, [categoryId]);
  console.log(menuItems);

  return (
    <div className="container">
      {alertMessage && ( <Alert
          variant="success"
          className="position-fixed top-0 start-50 translate-middle-x"
          show={alertMessage}
          onClose={() => handleAlertMessage(false)}
          dismissible
        >
          Item added to cart successfully!
        </Alert>)}
      <h2 className="sub-heading">Menu Items for Category {categoryId}</h2>
      <div className="row ">
        {menuItems.map((menuItem) => (
          <FoodItem {...menuItem } handleAlertMessage={handleAlertMessage}  />
        ))}
      </div>
    </div>
  );
}
