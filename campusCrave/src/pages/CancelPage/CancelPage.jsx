import React from 'react'
import { Button } from 'react-bootstrap'
import image from '../../assets/Failed.jpg'
export default function CancelPage() {
  return (
    <div className='text-center'>
        <div className='row align-items-center'>
        <div className='col-6 text-end'><img src={image}  /></div>
        <div className='col-6 text-start'><span className='heading'>Payment Failed !</span></div>
        

        </div>
        
        <span className='sub-heading text-muted'>The payment was unsuccesful due to an abnormility. Please try again later or use another payment method.</span>
        <div className='heading'>
        <Button className='bg-primary p-4 m-4 rounded text-white fw-bold '><span className='body-font'>Try Again</span></Button>
        </div>
        

    </div>
  )
}
