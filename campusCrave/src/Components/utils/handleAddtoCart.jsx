import React, { useState } from 'react';


const handleAddToCart = ( cartItems, setCartItems) => {
  const [showPopup, setShowPopup] = useState(false);

  const currentCartItem = cartItems.find((x) => x.productId === data.item_id);

  // Function to handle adding items to cart after confirming to empty cart
  const addToCartConfirmed = () => {
    setCartItems([
      {
        productId: cartItems.item_id,
        product: cartItems,
        bagCount: 1,
        totalAmount: cartItems.price,
      },
    ]);
    setShowPopup(false); // Close the popup after adding items to cart
  };

  if (currentCartItem) {
    // Check if the current item belongs to a different vendor
    if (currentCartItem.product.vendor !== data.vendor) {
      // Display popup asking to empty the cart
      setShowPopup(true);
      return;
    }

    // Update cart item quantity
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.productId === data.item_id) {
        return {
          ...cartItem,
          bagCount: cartItem.bagCount + 1,
          totalAmount: (
            parseFloat(data.price) * (cartItem.bagCount + 1)
          ).toFixed(2),
        };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  } else {
    setCartItems([
      ...cartItems,
      {
        productId: cartItems.item_id,
        product: cartItems,
        bagCount: 1,
        totalAmount: cartItems.price,
      },
    ]);
  }

  return (
    <>
      {/* Custom Popup Component */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>
              You already have items from a different vendor in your cart. Do
              you want to empty the cart and add items from this vendor?
            </p>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
            <button onClick={addToCartConfirmed}>Empty Cart</button>
          </div>
        </div>
      )}
    </>
  );
};

export default handleAddToCart;
