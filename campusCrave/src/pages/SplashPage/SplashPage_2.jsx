import React from 'react'
import logo from '../../assets/logo.png'
import splash1 from '../../assets/splash1.png'
import splash2 from '../../assets/splash2.png'
export default function SplashPage_2() {
  return (
    <div>
        <img src={splash1} className='fixed-top' />
        <div className='text-center'>
        <img className='mx-auto' src={logo} />
        </div>
      
        <img  src={splash2} className='fixed-bottom'/>
    </div>
  )
}
