import React, { useState } from "react";
import image from "../../assets/food_1.png";
import { Link } from "react-router-dom";
import { cilCart, cilNoteAdd, cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const FoodItem = (props) => {
  const [isItemBag, setisItemBag] = useState(false);
  const handleAddBag = () => {
    setisItemBag(!isItemBag);
  };
  return (
    <div className="col-6 col-md-3 text-center">
      <div className="rounded p-2" style={{ border: "2px solid grey" }}>
        <div>
          <img
            className="img-fluid rounded p-2"
            src={image}
            // src={props.data.img_url}
            alt={props.item_name}
          />
        </div>

        <div
          style={{
            marginTop: "10px",
          }}
        >
          <div>
            <div className="body-font fw-semibold">
              {props.vendor_name}'s{" "}
              <span className="body-font fw-normal">🌟 : {props.vendor_rating}</span>
            </div>

            <div className="body-font fw-semibold">
              {props.item_name}{" "}
              <span className="body-font fw-normal">🌟 : {props.item_rating}</span>
            </div>
          </div>

          <div
            style={{ width: "100%" }}
            className="d-flex justify-content-around align-items-center"
          >
            <span className="body-font fw-semibold">£{props.price}</span>
            {isItemBag ? (
              <CIcon icon={cilCart} className="cursor-pointer" />
            ) : (
              <CIcon
                icon={cilPlus}
                onClick={() => handleAddBag()}
                className="cursor-pointer"
                size="xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
