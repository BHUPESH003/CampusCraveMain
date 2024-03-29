import React from 'react';
import Toast from 'react-bootstrap/Toast';

const CartToast = ({ show, onClose, itemName }) => {
  return (
    <Toast show={show} onClose={onClose}>
      <Toast.Header>
        <strong className="mr-auto body-font">Item Added to Cart</strong>
      </Toast.Header>
      <Toast.Body className='sub-body-font'>{itemName} has been added to your cart.</Toast.Body>
    </Toast>
  );
};

export default CartToast;
