import { useEffect, useState } from 'react'
import SplashPage1 from './SplashPage1';
import SplashPage_2 from './SplashPage_2';
import OnboardingPage1 from '../Onboarding/OnboardingPage1';


function RenderSplash() {
  const [splashPage, setSplashPage] = useState(1);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setSplashPage(2);
    }, 2000); // Display the first splash page for 2 seconds

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (splashPage === 2) {
      const splashTimer = setTimeout(() => {
        setSplashPage(0); // Set to 0 to render the onboarding page
      }, 2000); // Display the second splash page for 2 seconds

      return () => clearTimeout(splashTimer);
    }
  }, [splashPage]);

 
  

  return (
    <div>
     {splashPage === 1 && <SplashPage1 />}
      {splashPage === 2 && <SplashPage_2 />}
      
    </div>
  )
}

export default RenderSplash
