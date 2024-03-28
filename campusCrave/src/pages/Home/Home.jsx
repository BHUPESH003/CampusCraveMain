import React from 'react'

import Categories from '../../Components/Categories/Categories'
import FoodCourts from '../../Components/FoodCourts/FoodCourts'


function Home() {
 
  return (
    <div>
        {/* <OnboardingPage1/> */}
        <div className='sub-heading'>
          Hey User, What's Up Buddy?
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