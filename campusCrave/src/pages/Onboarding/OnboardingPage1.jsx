import {React , useState} from 'react'
import image1 from '../../assets/food_1.png'
import image2 from '../../assets/food_2.png'
import image3 from '../../assets/food_3.png'
import { Button } from 'react-bootstrap'

export default function OnboardingPage1() {
  
    const [currentPage, setCurrentPage] = useState(1);
  
    const handleNext = () => {
      setCurrentPage(currentPage + 1);
    };
  
    
  
    const handleSkip = () => {
      setCurrentPage(3);
    };
  
  return (
    <div className="onboarding-screen">
    <div className={`onboarding-page ${currentPage === 1 ? 'active' : ''}`}>
      <img src={image1} />
      
      <h1>All your favourites</h1>
      <p>Get all your loved foods in one once place, you just place the order we do the rest</p>
      <button onClick={handleNext}>Next</button>
      <button onClick={handleSkip}>Skip</button>
    </div>

    <div className={`onboarding-page ${currentPage === 2 ? 'active' : ''}`}>
    
    <img src={image2} />
      
      <h1>Order from choosen chef</h1>
      <p>Get all your loved foods in one once place, you just place the order we do the rest</p>
   
      <button onClick={handleNext}>Next</button>
      <button onClick={handleSkip}>Skip</button>
    </div>

    <div className={`onboarding-page ${currentPage === 3 ? 'active' : ''}`}>
    <img src={image3} />
      
      <h1>Save your time</h1>
      <p>Get all your loved foods in one once place, you just place the order we do the rest</p>
      <button>Get Started</button>
      
    </div>
    <div className="dot-indicators">
        {[1, 2, 3].map((index) => (
          <span
            key={index}
            className={`dot ${currentPage === index ? 'active-dot' : ''}`}
          ></span>
        ))}
      </div>
  </div>
  )
}
