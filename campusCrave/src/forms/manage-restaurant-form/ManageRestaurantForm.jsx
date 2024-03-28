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
      <Form.Group controlId="vendorName">
        <Form.Label>Vendor Name</Form.Label>
        <Form.Control type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="vendorDesc">
        <Form.Label>Vendor Description</Form.Label>
        <Form.Control as="textarea" rows={3} value={vendorDesc} onChange={(e) => setVendorDesc(e.target.value)} />
      </Form.Group>

      {menuItems.map((menuItem, index) => (
        <div key={index} className="mb-3 border p-3">
          <h5>Menu Item {index + 1}</h5>
          <Row>
            <Col md={6} lg={4}>
              <Form.Group controlId={`category${index}`}>
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" value={menuItem.category} onChange={(e) => handleMenuItemChange(index, 'category', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} lg={4}>
              <Form.Group controlId={`name${index}`}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={menuItem.name} onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} lg={4}>
              <Form.Group controlId={`price${index}`}>
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={menuItem.price} onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} lg={4}>
              <Form.Group controlId={`preparationTime${index}`}>
                <Form.Label>Preparation Time</Form.Label>
                <Form.Control type="text" value={menuItem.preparationTime} onChange={(e) => handleMenuItemChange(index, 'preparationTime', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} lg={4}>
              <Form.Group controlId={`desc${index}`}>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={menuItem.desc} onChange={(e) => handleMenuItemChange(index, 'desc', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} lg={4}>
              <Form.Group controlId={`image${index}`}>
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" value={menuItem.image} onChange={(e) => handleMenuItemChange(index, 'image', e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="danger" onClick={() => handleRemoveMenuItem(index)}>
            Remove Menu Item
          </Button>
        </div>
      ))}

      <Button variant="primary" onClick={handleAddMenuItem}>
        Add Menu Item
      </Button>

      <div className="mt-3">
        <Button variant="success" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default ManageRestaurantForm;
