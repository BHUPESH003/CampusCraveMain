import React from "react";
import vendorImage from "../../assets/Vendor2.jpg";
import CartItem from "../../Components/CartItem/CartItem";
import { useAtomValue } from "jotai";
import { cartAtomNew } from "../../store";
import { env } from "../../../env";
import { loadStripe } from "@stripe/stripe-js";
// import CircularJSON from "circular-json"; // Import CircularJSON library
import { useNavigate } from "react-router-dom";
export default function CheckOut() {
  const cartItems = useAtomValue(cartAtomNew);
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.product.price) * item.bagCount;
    }, 0);
  };
  function transformCartItems(cartItems) {
    return cartItems.map((item) => ({
      itemId: item.product.item_id,
      itemName: item.product.item_name,
      price: parseFloat(item.product.price),
      quantity: item.bagCount,
    }));
  }

  // const calculateAverageVendorTime = (cartItems) => {
  //   const totalVendorTime = cartItems.reduce(
  //     (acc, item) => acc + item.product.vendor_avg_time,
  //     0
  //   );
  //   return totalVendorTime / cartItems.length; // Calculate average
  // };
  // const calculateFoodReadyTime = (cartItems) => {
  //   // Calculate average time from cartItems
  //   const avgTimeInMinutes = calculateAverageVendorTime(cartItems);

  //   // Calculate food ready time by adding avg time to current time
  //   const currentTime = new Date();
  //   const foodReadyTime = new Date(
  //     currentTime.getTime() + avgTimeInMinutes * 60000
  //   ); // Convert minutes to milliseconds

  //   return foodReadyTime.toISOString();
  // };
 
  const calculateFoodReadyTime = (cartItems) => {
    if (cartItems.length === 0) {
      // If cart is empty, return null or any default value
      return null;
    }
    // Calculate average time from cartItems
    const avgTimeInMinutes = cartItems[0].product.avg_time;

    // Calculate food ready time by adding avg time to current time
    const currentTime = new Date();
    const foodReadyTime = new Date(
      currentTime.getTime() + avgTimeInMinutes * 60000
    ); // Convert minutes to milliseconds

    // Return a valid date string
    return foodReadyTime.toISOString();
  };
  const transformedData = {
    products: {
      orderTime: new Date().toISOString(), // Current time
      foodReadyTime: calculateFoodReadyTime(cartItems), // Food ready time based on vendor avg time
      price: calculateSubtotal(),
      comment: "Special request by bhupesh",
      vendorId: cartItems.length > 0 ? cartItems[0].product.vendor_id : null, // Check if cartItems is not empty before accessing vendor_id
      createdAt: new Date().toISOString(),
      paymentId: 2,
      paymentStatus: "Received",
      // paymentStatus: "Pending",
      itemsOrdered: transformCartItems(cartItems),
    },
  };


  // const makePayment = async () => {
  //   const tokenResponse = await fetch("http://localhost:3000/verify-token", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (!response.ok) {
  //     // Handle unauthorized access or invalid token
  //     // Redirect to login page or display a message
  //     return;
  //   }

  //   const { userId } = await tokenResponse.json();
  //   const stripe = await loadStripe(
  //     "pk_test_51OydDmSGp7YEjcqZzGGwgEehYBbbGb5jKar9wIDDwEyK1liKLUv5aZY1XZr9jsu2WcgvwvPF4U83hibDdFZte1j7003TVYhJvi"
  //   );

  //   const response = await fetch(
  //     "http://localhost:3000/create-checkout-session",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         products: transformedData,
  //       }),
  //     }
  //   );

  //   const session = await response.json();

  //   console.log(session);

  //   const result = stripe.redirectToCheckout({
  //     sessionId: session.id,
  //   });

  //   if (result.error) {
  //     console.log(result.error);
  //   }
  // };

  // async function createCheckoutSession(data) {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/create-checkout-session",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ products: data }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to create checkout session");
  //     }

  //     const session = await response.json();

  //     // Initialize Stripe with your publishable key
  //     const stripe = loadStripe(
  //       "pk_test_51OydDmSGp7YEjcqZzGGwgEehYBbbGb5jKar9wIDDwEyK1liKLUv5aZY1XZr9jsu2WcgvwvPF4U83hibDdFZte1j7003TVYhJvi"
  //     );

  //     // Redirect to the Stripe checkout session
  //     const { error } = await stripe.redirectToCheckout({
  //       sessionId: session.id,
  //     });

  //     if (error) {
  //       throw new Error("Failed to redirect to checkout");
  //     }
  //   } catch (error) {
  //     console.error("Error creating checkout session:", error);
  //     throw error;
  //   }
  // }
  const navigate = useNavigate();
  const verifyTokenAndProceedToCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login page or display a message
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:3001/verify-token", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Handle unauthorized access or invalid token
        // Redirect to login page or display a message
        return;
      }
      const { userName } = await response.json();
      makePayment(userName);
    } catch (error) {
      console.error("Error verifying token and proceeding to checkout:", error);
    }
  };

  const makePayment = async (userName) => {
    try {
      // Proceed to checkout
      const stripe = await loadStripe(
        "pk_test_51OydDmSGp7YEjcqZzGGwgEehYBbbGb5jKar9wIDDwEyK1liKLUv5aZY1XZr9jsu2WcgvwvPF4U83hibDdFZte1j7003TVYhJvi"
      );

      console.log(transformedData.products);

      const checkoutSessionResponse = await fetch(
        "http://localhost:3001/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: userName,
            products: transformedData,
          }),
        }
      );

      const session = await checkoutSessionResponse.json();

      console.log(session);

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  // Call this function when the user clicks on checkout
  const handleCheckout = async () => {
    await verifyTokenAndProceedToCheckout();
  };

  return (
    <div className="container w-75 my-2">
      <div className="row shadow pt-3">
        <div className="row pt-2 px-3">
          <div className="col-2">
            <img className="img-fluid rounded" src={vendorImage} />
          </div>
          <div className="col-4 align-self-center">
            <h4 className="fw-bold heading">Your Cart</h4>
          </div>
          <div className="col align-self-center text-end text-muted"></div>
        </div>
        <div className="px-3">
          {cartItems.map(
            (items) => items.bagCount > 0 && <CartItem {...items} />
          )}
        </div>
        <div class="row pb-2 px-3">
          <div class="col-5">
            <h3 className="fw-bold text-muted">TOTAL PRICE</h3>
          </div>
          <div class="col-6 text-center text-right">
            {" "}
            <h3 className="sub-heading fw-bold">{calculateSubtotal()}</h3>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        {" "}
        <button
          type="button"
          className="btn btn-dark w-75"
          onClick={() => {
            handleCheckout();
          }}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
}
