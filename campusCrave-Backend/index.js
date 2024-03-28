const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { getOrder, storeOrder } = require("./routes/Orders");

const rootRouter = require("./routes/index");
const Stripe = require("stripe");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2020-08-27", // Specify the API version (optional)
});

// Endpoint to create a checkout session
app.post("/create-checkout-session", async (req, res) => {
  try {
    // Extract product data and customer information from the request body
    const { products } = req.body;

    // Store the order in the database and retrieve the order details
    const orderId = await storeOrder(products);
    const order = await getOrder(orderId);

    // Prepare line items for the checkout session
    const lineItems = order.itemsOrdered.map((product) => ({
      price_data: {
        currency: "inr", // Set the currency as INR
        product_data: {
          name: product.itemname, // Set the item name
        },
        unit_amount: Math.round(product.price * 100), // Convert price to smallest currency unit (e.g., cents)
      },
      quantity: product.quantity, // Set the quantity
    }));

    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/", // URL to redirect after successful payment
      cancel_url: "http://localhost:5173/cancel", // URL to redirect after payment cancellation
    });

    // Return the session ID to the client
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
