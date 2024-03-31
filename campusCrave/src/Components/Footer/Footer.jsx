import { cibDribbble, cibFacebook, cibGoogle, cibTwitter, cilEnvelopeClosed, cilHome, cilPhone, cilPrint } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'

function Footer() {
  return (
    


    <div className="text-white  text-center text-lg-start bg-dark ">
    
    <div className="container p-4">
     
      <div className="row mt-4">
        
        <div className="col-lg-4 col-md-12 mb-4 mb-md-0 ">
          <h5 className="text-uppercase mb-4 heading"><b>Campus Crave:<br />Your Ultimate Food Hub on Campus.</b></h5>
  
          <p className='body-font'> 
          Fueling Campus Life, One Bite at a Time.<br />
          Satisfy Your Cravings, Anytime, Anywhere.
          </p>
  
          <p className='body-font'>
          Ordering Made Easy for Busy College Days.
          </p>
  
          <div className="mt-4">
            
          <a href="https://www.facebook.com" className="text-white m-3">
          <CIcon icon={cibFacebook} size='xxl' />
              </a>
              <a href="https://www.google.com" className="text-white m-3">
              <CIcon icon={cibGoogle} size='xxl'/>
              </a>
              <a href="https://www.dribbble.com" className="text-white m-3">
              <CIcon icon={cibDribbble} size='xxl' />
              </a>
              <a href="https://www.twitter.com" className="text-white m-3">
              <CIcon icon={cibTwitter} size='xxl'/>
              </a>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase mb-4 pb-1 heading"><b>Search something</b></h5>
  
          <div className="form-outline form-white mb-4 p-2 ">
            <input type="text" id="formControlLg" placeholder='Search' className="form-control form-control-lg " />
           
          </div>
  
          <ul className="fa-ul list-unstyled body-font">
            <li className="mb-3">
              <span className="fa-li"><CIcon icon={cilHome} size='xxl'/>
                </span><span className="ms-2 body-font">New Delhi, DL 10012, India</span>
            </li>
            <li className="mb-3">
              <span className="fa-li"><CIcon icon={cilEnvelopeClosed} size='xxl'/></span><span className="ms-2 body-font">info@example.com</span>
            </li>
            <li className="mb-3">
              <span className="fa-li"><CIcon icon={cilPhone} size='xxl'/></span><span className="ms-2 body-font">+ 91 234 567 88</span>
            </li>
            <li className="mb-3">
              <span className="fa-li"><CIcon icon={cilPrint} size='xxl'/></span><span className="ms-2 body-font">+ 91 234 567 89</span>
            </li>
          </ul>
        </div>
        
  
        
        <div className="col-lg-4 col-md-6 mb-4 mb-md-0 ">
          <h5 className="text-uppercase mb-4 heading "><b>Opening hours</b></h5>
  
          <table className="table text-center text-white">
            <tbody className="font-weight-normal heading">
              <tr>
                <td>Mon - Thu:</td>
                <td>8am - 9pm</td>
              </tr>
              <tr>
                <td>Fri - Sat:</td>
                <td>8am - 1am</td>
              </tr>
              <tr>
                <td>Sunday:</td>
                <td>9am - 10pm</td>
              </tr>
            </tbody>
          </table>
        </div>
      
      </div>
      
    </div>
  
    <div className="text-center p-3 body-font" >
      © 2024 
      
    </div>
    
 
  
</div>


  )
}

export default Footer