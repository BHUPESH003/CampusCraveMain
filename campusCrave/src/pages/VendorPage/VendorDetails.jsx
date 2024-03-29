import React, { useState } from "react";
import image from "../../assets/food_1.png";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import { Button } from "react-bootstrap";
import { handleCartService } from "../services/internalServices/handlecart";
import { useAtom } from "jotai";
import { cartAtomNew } from "../../store";
import CartToast from "../../Components/CartToast/CartToast";

const VendorDetails = (props) => {
  const [cartItems, setCartItems] = useAtom(cartAtomNew);
  const [showToast, setShowToast] = useState(false);
  // const handleAddToCart = (data) => {
  //   // console.log(cartItems)
  // //   let cc = handleCartService.updateCartApi(cartItems, data);
  // //   setCartItems([...cc]);
  // // };
  const handleAddToCart = (data) => {
    
    const currentCartItem = cartItems.find((x) => x.productId === data.item_id);
    // Check if cart contains items and if they belong to a different vendor
    const hasDifferentVendor = cartItems.some(
      (item) => item.product.vendor_id !== data.vendor_id
    );
      
    if (hasDifferentVendor) {
      const confirmEmpty = window.confirm(
        "Adding items from a different vendor will empty your cart. Do you want to continue?"
      );

      if (confirmEmpty) {
        // Clear the cart by setting it to an empty array
        setCartItems([]);
        return
      } else {
        return; // Cancel adding items if user chooses not to empty the cart
      }
    }
    if (currentCartItem) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.productId === data.item_id) {
          return {
            ...cartItem,
            bagCount: cartItem.bagCount + 1,
            totalAmount: (parseFloat(data.price) * (cartItem.bagCount + 1))
              .toFixed(2)
              .toString(),
          };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
    } else
      setCartItems([
        ...cartItems,
        {
          productId: data.item_id,
          product: data,
          bagCount: 1,
          totalAmount: data.price,
        },
      ]);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
  };
  return (
    <div class="row border-bottom border-2 my-2">
      <CartToast
        show={showToast}
        onClose={() => setShowToast(false)}
        itemName={props.item_name} 
      />
      <div className="col-9 align-self-center">
        <div>
          <span className="body-font fw-bold">{props.item_name}</span> <br />
          <span className="d-flex justify-content-between">
            <span className="body-font fw-semibold">₹{props.price} </span>
            <span className="body-font">
              🌟{parseFloat(props.item_avg_rating).toFixed(2)}{" "}
            </span>
            {/* <button className="bg-light text-black border-1 border-secondary px-2 py-1 rounded body-font">
              ADD+
            </button> */}
            <Button
              className="bg-light text-black border-1 border-secondary rounded"
              onClick={() => {
                handleAddToCart(props);
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>ADD +</span>
            </Button>
            
            
          </span>
        </div>
        
        
        <div className="body-font">{props.item_description}</div>
      </div>
      <div className="col-3 d-flex align-items-center justify-content-center  position-relative">
        <img
          src={image}
          // src={props.image_url}

          alt={props.item_name}
          style={{ width: "55%", height: "65%" }}
          className="rounded"
        />
        {/* <Button style={{width:'5vw',left:'45vw',top:'100vw'}} className='bg-light text-black  position-absolute  translate-middle-x translate-middle-y p-2 border border-success'><span className="body-font fw-bold m-2 ">ADD</span><CIcon className="mt-2" icon={cilPlus} size="xxl" /></Button> */}
      </div>
    </div>
  );
};

export default VendorDetails;
