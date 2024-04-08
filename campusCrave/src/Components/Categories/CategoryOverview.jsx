// import CIcon from "@coreui/icons-react";
// import { cilHeart } from "@coreui/icons";
import { Link } from "react-router-dom";
// import { userWishListItem } from "../utils/apiModels/userModel";
// import { productData } from "../utils/apiModels/productModel";
// import { useAtom } from "jotai";
// import { wishlistAtom } from "../store";
// import { HeartFill } from "react-bootstrap-icons";
// import { handleWishListService } from "../services/internalServices/handleWishList";
import image from "../../assets/food_1.png";
import { s3 } from "../../../env";

const CategoryOverview = (props) => {
  //   const [wishlist, setWishlist] = useAtom(wishlistAtom);

  //   const addToWishlist = (data) => {
  //     let ww = handleWishListService.updateWishListAPI(wishlist, data);
  //     setWishlist([...ww]);
  // Check if the product is already in the wishlist
  // const isInWishlist = wishlist.some(
  //   (item) => item.name === data.category_name
  // );

  // // If the product is not in the wishlist, add it
  // if (!isInWishlist) {
  //   const newItem: userWishListItem = {
  //     name: data.category_name,
  //     productId: data.id,
  //     costPerUnit: data.price,
  //     imageUrl: data.imageUrl
  //   };

  //   setWishlist((prevWishlist) => [...prevWishlist, newItem]);
  // } else {
  //   setWishlist((prevWishlist) => {
  //     return prevWishlist.filter(
  //       (item) => item.name !== data.category_name
  //     );
  //   });
  // }
  //   };
  //   const isItemInWishlist = wishlist.some(
  //     (item) => item.name === props.data.category_name
  //   );
  const slicedString=props.data.img_url.slice(2,props.data.img_url.length-2);
console.log(props.data)
  return (
    <div className="container-fluid overflow-hidden d-flex align-items-center justify-content-center m-0 p-0">
      <div className="text-center">
        <Link to={`/category/${props.data.id}`} className="text-body">
          <div>
            <img
              style={{
                position: "relative",
                width: "10vw",
              }}
              className="rounded-circle"
              src={s3.baseUrl + slicedString}
              // src={props.data.img_url}
              alt={props.data.title}
            />
          </div>
        </Link>

        <div
          style={{
            marginTop: "10px",
          }}
        >
          <div>
            <span className="fw-bold body-font">
              {props.data.category_name}
            </span>
          </div>

          {/* <div style={{ width: "100%" }}>
            <span style={{ fontWeight: "bold" }}>
              £{props.data.price}
            </span>
            {/* {isItemInWishlist ? (
              <HeartFill
                style={{ position: "absolute", right: "0", color: "#FF8F18" }}
                size={16}
                color="red"
                onClick={() => addToWishlist(props.data)}
                cursor={"pointer"}
              />
            ) : (
              <CIcon
                style={{ position: "absolute", right: "0", color: "#FF8F18" }}
                icon={cilHeart}
                onClick={() => addToWishlist(props.data)}
                className="cursor-pointer"
              />
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryOverview;
