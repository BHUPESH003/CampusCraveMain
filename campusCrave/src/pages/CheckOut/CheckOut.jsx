import React from "react";
import vendorImage from "../../assets/Vendor2.jpg";
import CartItem from "../../Components/CartItem/CartItem";
import { useAtomValue } from "jotai";
import { cartAtomNew } from "../../store";
import { env } from "../../../env";
import { loadStripe } from "@stripe/stripe-js";
// import CircularJSON from "circular-json"; // Import CircularJSON library

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
  const transformedData = {
    products: {
      orderId: 1,
      userId: 3,
      orderTime: "2024-02-13 12:00:00",
      foodReadyTime: "2024-02-13 12:30:00",
      price: 10.99,
      comment: "No special requests",
      vendorId: 6,
      createdAt: "2024-02-14 05:50:41.968763",
      paymentId: 2,
      paymentStatus: "Received",
      itemsOrdered: transformCartItems(cartItems),
    },
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OydDmSGp7YEjcqZzGGwgEehYBbbGb5jKar9wIDDwEyK1liKLUv5aZY1XZr9jsu2WcgvwvPF4U83hibDdFZte1j7003TVYhJvi"
    );

    console.log(transformedData.products);

    const response = await fetch(
      "http://localhost:3000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: transformedData,
        }),
      }
    );

    const session = await response.json();

    console.log(session);

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

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
            makePayment();
          }}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
}
