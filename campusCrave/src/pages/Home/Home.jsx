import React, { useEffect, useState } from 'react'

import Categories from '../../Components/Categories/Categories'
import FoodCourts from '../../Components/FoodCourts/FoodCourts'


function Home() {

  
    const [greeting, setGreeting] = useState("");
    const [username , setUsername] = useState("");
  
    useEffect(() => {
      const currentHour = new Date().getHours();
      let newGreeting = "";
  
      if (currentHour >= 5 && currentHour < 12) {
        newGreeting = "Good morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        newGreeting = "Good afternoon";
      } else {
        newGreeting = "Good evening";
      }
  
      setGreeting(newGreeting);

      
    }, []);

    useEffect(() => {
      const verifyTokenAndProceedToMyProfile = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            // Redirect to login page or display a message
            navigate("/login");
            return;
          }
  
          const response = await fetch("http://localhost:3001/verify-token", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            // Handle unauthorized access or invalid token
            // Redirect to login page or display a message
            return;
          }
          const { userName } = await response.json();
          setUsername(userName);
         
         
          
        } catch (error) {
          console.error(
            "Error verifying token and proceeding to checkout:",
            error
          );
        }
      };
      verifyTokenAndProceedToMyProfile();
    }, []);
 
  return (
    <div>
        {/* <OnboardingPage1/> */}
        <div className='sub-heading'>
         {greeting}   {username}
        </div>
        
        <div>
        {/* <CategorySlider  data={sampleProductData} heading="What's on Your Mind" /> */}
          <Categories/>
        </div>
        <div>
          
          <FoodCourts />
        </div>
        
        {/* <CartItem /> */}
    </div>
  )
}

export default Home