import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ManageRestaurantForm = () => {
  const [vendorName, setVendorName] = useState('');
  const [vendorDesc, setVendorDesc] = useState('');
  const [menuItems, setMenuItems] = useState([
    { category: '', name: '', price: '', preparationTime: '', desc: '', image: '' },
  ]);

  const handleAddMenuItem = () => {
    setMenuItems([...menuItems, { category: '', name: '', price: '', preparationTime: '', desc: '', image: '' }]);
  };

  const handleRemoveMenuItem = (index) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems.splice(index, 1);
    setMenuItems(updatedMenuItems);
  };

  const handleMenuItemChange = (index, field, value) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index][field] = value;
    setMenuItems(updatedMenuItems);
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., send data to the backend
    console.log({ vendorName, vendorDesc, menuItems });
  };

  return (
    <Form className="container mt-4">
      <Form.Group controlId="vendorName " className='heading m-5'>
        <Form.Label>Vendor Name</Form.Label>
        <Form.Control type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="vendorDesc" className='heading m-5'>
        <Form.Label>Vendor Description</Form.Label>
        <Form.Control as="textarea" rows={3} value={vendorDesc} onChange={(e) => setVendorDesc(e.target.value)} />
      </Form.Group>

      {menuItems.map((menuItem, index) => (
        <div key={index} className="mb-3 border p-3 heading">
          <h5 className='sub-heading'>Menu Item {index + 1}</h5>
          <Row>
            <Col md={6} lg={4}>
              <Form.Group controlId={`category${index}`} className='heading'>
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" value={menuItem.category} onChange={(e) => handleMenuItemChange(index, 'category', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} lg={4}>
              <Form.Group controlId={`name${index}`} className='heading'>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={menuItem.name} onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} lg={4}>
              <Form.Group controlId={`price${index}`} className='heading'>
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={menuItem.price} onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} lg={4}>
              <Form.Group controlId={`preparationTime${index}`} className='heading'>
                <Form.Label>Preparation Time</Form.Label>
                <Form.Control type="text" value={menuItem.preparationTime} onChange={(e) => handleMenuItemChange(index, 'preparationTime', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} lg={4}>
              <Form.Group controlId={`desc${index}`} className='heading'>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={menuItem.desc} onChange={(e) => handleMenuItemChange(index, 'desc', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} lg={4}>
              <Form.Group controlId={`image${index}`} className='heading'>
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" value={menuItem.image} onChange={(e) => handleMenuItemChange(index, 'image', e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="danger" className=' text-white  fw-bold' onClick={() => handleRemoveMenuItem(index)}>
           <span className='body-font'>Remove Menu Item</span> 
          </Button>
        </div>
      ))}

      <Button variant="primary" className=' text-white  fw-bold' onClick={handleAddMenuItem}>
      <span className='body-font'>Add Menu Item</span>
      </Button>

      <div className="m-5 text-center">
        <Button variant="success" onClick={handleSubmit} className=' text-white  fw-bold'>
          <span className='body-font'>Save Changes</span>
        </Button>
      </div>
    </Form>
  );
};

export default ManageRestaurantForm;
