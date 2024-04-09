import axios from "axios";
import React, { useEffect, useState } from "react";
import FoodCourtsOverview from "./FoodCourtsOverview";
import { Col } from "react-bootstrap";
import { env } from "../../../env";

export default function FoodCourts() {
  const [vendorsWithRatings, setVendorsWithRatings] = useState([]);

  useEffect(() => {
    // Fetch vendors with ratings
    axios
      .get(`${env.baseUrl}/vendor/all`)
      .then((response) => setVendorsWithRatings(response.data))
      .catch((error) =>
        console.error("Error fetching vendors with ratings:", error)
      );
      
  }, []);
  // const VendorData = [{ VendorName: 'Aggarwal Sweets', imgUrl: 'https://picsum.photos/200/300', dishes: ['ladoo', 'burfi', 'kajuKatli', 'rasgulla'], rating: '4.3', avgTime: '20mins' },
  // { VendorName: 'Aggarwal Sweets', imgUrl: 'https://picsum.photos/200/300', dishes: ['ladoo', 'burfi', 'kajuKatli', 'rasgulla'], rating: '4.3', avgTime: '20mins' },
  // { VendorName: 'Aggarwal Sweets', imgUrl: 'https://picsum.photos/200/300', dishes: ['ladoo', 'burfi', 'kajuKatli', 'rasgulla'], rating: '4.3', avgTime: '20mins' }];

  return (
    <div className="container">
      <div className="row">
        {vendorsWithRatings.map((item) => (
            <FoodCourtsOverview {...item} />
       
        ))}
      </div>
    </div>
  );
}
