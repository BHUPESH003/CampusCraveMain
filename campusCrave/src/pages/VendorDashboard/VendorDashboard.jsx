import React from 'react'

export default function VendorDashboard() {
  return (
    <div className='bg-muted' >
       <h1>Orders</h1>
        <div className='row'>
        <div className='border-3 shadow m-4 p-4 '  style={{width:"25rem"}}
        >
            <div className='row body-font fw-bold'>TODAY</div>
            <div className='row heading fw-bold text-primary'>25</div>
            <div className='row body-font text-muted'>25 orders today</div>
        </div>
        <div className='border-3 shadow  m-4 p-4 ' style={{width:"25rem"}}
        >
            <div className='row body-font fw-bold'>THIS WEEK</div>
            <div className='row heading fw-bold text-primary'>25</div>
            <div className='row body-font text-muted'>25 orders this week</div>
        </div>
        <div className='border-3 shadow  m-4 p-4 ' style={{width:"25rem"}}
        >
            <div className='row body-font fw-bold '>THIS MONTH</div>
            <div className='row heading text-primary fw-bold'>25</div>
            <div className='row body-font text-muted'>25 orders this month.</div>
        </div>
        </div>
        <h1>Revenue</h1>
        <div className='row'>
        <div className='border-3 shadow m-4 p-4 '  style={{width:"25rem"}}
        >
            <div className='row body-font fw-bold'>TODAY</div>
            <div className='row heading fw-bold text-primary'>Rs 25</div>
            <div className='row body-font text-muted'>25 orders today</div>
        </div>
        <div className='border-3 shadow  m-4 p-4 ' style={{width:"25rem"}}
        >
            <div className='row body-font fw-bold'>THIS WEEK</div>
            <div className='row heading fw-bold text-primary'>Rs 25</div>
            <div className='row body-font text-muted'>25 orders this week</div>
        </div>
        <div className='border-3 shadow  m-4 p-4 ' style={{width:"25rem"}}
        >
            <div className='row body-font fw-bold '>THIS MONTH</div>
            <div className='row heading text-primary fw-bold'>Rs 25</div>
            <div className='row body-font text-muted'>25 orders this month.</div>
        </div>
        </div>
    </div>
  )
}
