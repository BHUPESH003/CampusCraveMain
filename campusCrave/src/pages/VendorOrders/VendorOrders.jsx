import React from 'react'
import { Table } from 'react-bootstrap'

export default function VendorOrders() {
  return (
    <div>
        <h1>Orders</h1>
      <Table className="basic ">
        <thead className='heading shadow'>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </Table>
    </div>
  )
}
