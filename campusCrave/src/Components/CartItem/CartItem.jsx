import React, { useState } from "react";
import image from "../../assets/food_2.png";
import { Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { cartAtomNew } from "../../store";
import { handleCartService } from "../../pages/services/internalServices/handlecart.js";
import CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";

export default function CartItem(props) {
  const [cartItem, setCartItems] = useAtom(cartAtomNew);
  const increaseBagCount = (data) => {
    // let cc = handleCartService.increaseCartCount(cartItem, data);
    // setCartItems([...cc]);
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.productId === data.productId
          ? {
              ...item,
              bagCount: item.bagCount + 1,
              totalAmount: (
                parseFloat(item.product.costPerUnit) *
                (item.bagCount + 1)
              )
                .toFixed(2)
                .toString(),
            }
          : item
      )
    );
  };

  const decreaseBagCount = (data) => {
    // let cc = handleCartService.decreaseCartCount(cartItem, data);
    // setCartItems([...cc]);
    if (data.bagCount > 0) {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.productId === data.productId
            ? {
                ...item,
                bagCount: item.bagCount - 1,
                totalAmount: (
                  parseFloat(item.product.costPerUnit) *
                  (item.bagCount - 1)
                )
                  .toFixed(2)
                  .toString(),
              }
            : item
        )
      );
    }
  };

  const handleDelete = (itemId) => {
    // Filter out the item with the specified id
    // let cc = handleCartService.emptyCartItem(cartItem, itemId);
    // setCartItems(cc);
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.productId !== itemId)
    );
  };
  return (
    //     <div className="card d-flex flex-row"  style={{width : "14rem"}}>
    //   <img src={image}  className="card-img-top" alt="..." />
    //   <div className="card-body">
    //     <h5 className="card-title">Card title</h5>
    //     <p className="card-text">HashTag</p>
    //     <h6>Rs.70</h6>
    //     <div className='d-flex flex-row-reverse'>
    //     <button className="btn btn-outline-secondary" type="button" onClick={handleDecrement}>-</button>

    //           <input type="text" className='text-center' value={quantity} readOnly />

    //             <button className="btn btn-outline-secondary" type="button" onClick={handleIncrement}>+</button>
    //     </div>
    //   </div>
    // </div>
    // <div className="row main align-items-center">
    //   <div className="col-2 p-4 ">
    //     <img className="img-fluid rounded" src={image} />
    //   </div>
    //   <div className="col">
    //     <div className="row text-muted">Category</div>
    //     <div className="row">Item_name</div>
    //   </div>
    //   <div className="col">
    //     <div className="input-group">
    //       <span className="input-group-btn">
    //         <button
    //           type="button"
    //           className="btn btn-danger btn-number"
    //           data-type="minus"
    //           data-field="quant[2]"
    //           onClick={handleDecrement}
    //         >
    //           -
    //         </button>
    //       </span>
    //       <input
    //         type="text"
    //         name="quant[2]"
    //         className="form-control input-number text-center"
    //         value={quantity}
    //         min="1"
    //         max="100"
    //       />
    //       <span className="input-group-btn">
    //         <button
    //           type="button"
    //           className="btn btn-success btn-number"
    //           data-type="plus"
    //           data-field="quant[2]"
    //           onClick={handleIncrement}
    //         >
    //           +
    //         </button>
    //       </span>
    //     </div>
    //   </div>
    //   <div className="col-4 text-center align-self-center">Rs 70</div>
    //   <div className=" col-2 text-center align-self-center  ">
    //     <button type="button" className="btn btn-light ">
    //       &#10005;
    //     </button>
    //   </div>
    // </div>
    <div className="row border-bottom border-2 my-2 px-2">
      <div className="col-9 align-self-center">
        <div>
          <span className="sub-heading fw-bold">{props.product.item_name}</span>{" "}
          <br />
          <span className="d-flex justify-content-between align-items-center">
            <span className="sub-heading fw-semibold">
              ₹{props.product.price}{" "}
            </span>

            <span className="body-font d-flex align-items-center">
              <Button
                className=" border-0 bg-light text-black sub-heading mx-2"
                onClick={() => decreaseBagCount(props)}
              >
                
                <span style={{ fontSize: "3rem" }}>-</span>
              </Button>
              <span className="fw-bold text-center" style={{fontSize:'2rem'}}>{props.bagCount}</span>
              <Button
                className="border-0 bg-light text-black sub-heading mx-2"
                onClick={() => increaseBagCount(props)}
              >
             
                <span style={{ fontSize: "3rem" }}>+</span>
              </Button>
              <Button
                onClick={() => handleDelete(props.productId)}
                className=" border-0 bg-light text-black mx-2"
              >
                <CIcon icon={cilTrash} size="xxl" />
              </Button>
            </span>
          </span>
        </div>
      </div>
      <div className="col-3 d-flex align-items-center justify-content-center  position-relative">
        <img
          src={image}
          // src={props.image_url}

          alt={props.item_name}
          style={{ width: "75%", height: "75%" }}
          className="rounded"
        />
      </div>
    </div>
  );
}
