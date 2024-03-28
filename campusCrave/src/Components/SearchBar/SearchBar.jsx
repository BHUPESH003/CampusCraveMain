import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import React from 'react'

export default function SearchBar() {
  return (
    <div className='m-5'>
        <CInputGroup className="flex-nowrap">
        <CInputGroupText id="addon-wrapping"><CIcon icon={cilSearch} size='xxl' /></CInputGroupText>
        
        <CFormInput className='heading' placeholder="Search dishes " aria-label="Username" aria-describedby="addon-wrapping" />
        </CInputGroup>
        </div>
  )
}

