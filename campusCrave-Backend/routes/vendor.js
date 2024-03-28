const express = require("express");
const vendorRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const client = require("../config/index");
const { v4: uuidv4 } = require("uuid");
const authenticateToken = require("../MiddleWares/authMiddleWare");


// const vendorSchema = z.object({
//   username: z.string().min(3),
//   vendorName: z.string().min(3),
//   vendorDesc: z.string(),
//   imagePath: z.string(),
// });
// vendorRouter.put("/details", async (req, res) => {
//   try {
//     // Validate input using Zod
//     const { username, vendorName, vendorDesc, imagePath } = vendorSchema.parse(
//       req.body
//     );

//     // Retrieve the User_ID from the users table based on the provided username
//     const userResult = await client.query(
//       "SELECT user_id FROM users WHERE username = $1",
//       [username]
//     );

//     if (userResult.rows.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const user_Id = userResult.rows[0].user_id;
//     // Insert the new vendor into the vendors table
//     const result = await client.query(
//       "INSERT INTO vendors (user_id, vendor_name, vendor_desc, image_path) VALUES ($1, $2, $3, $4) RETURNING *",
//       [user_Id, vendorName, vendorDesc, imagePath]
//     );

//     // Respond with the newly created vendor
//     const newVendor = result.rows[0];
//     const vendorId = result.rows[0].vendor_id;
//     const ratingResult = await client.query(
//       "INSERT INTO vendor_ratings (Vendor_ID, Overall_Rating, Comment) VALUES ($1, $2, $3) RETURNING *",
//       [vendorId, 0, "Initial Comment"]
//     );
//     res.status(201).json(newVendor);
//   } catch (error) {
//     console.error("Error creating a new vendor:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

// Vendor login route
vendorRouter.post("/login", async (req, res) => {
  try {
    // Validate input using Zod
    const { username, password } = loginSchema.parse(req.body);

    // Retrieve vendor information from the vendors table
    const result = await client.query(
      "SELECT * FROM vendors v JOIN users u ON v.user_id = u.user_id WHERE u.username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const vendor = result.rows[0];

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, vendor.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create a JWT token for the vendor
    const token = jwt.sign(
      { userId: vendor.user_id, userType: vendor.user_type },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the JWT token
    res.json({ token });
  } catch (error) {
    console.error("Error during vendor login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

vendorRouter.post("/register", async (req, res) => {
  const {
    username,
    password,
    email,
    phoneNo,
    vendorName,
    vendorDesc,
    imagePath,
    avg_time,
  } = req.body;

  try {
    // Check if the username or email is already registered
    const existingUser = await client.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique User_ID and Vendor_ID
    const userId = uuidv4();
    const vendorId = uuidv4();

    // Start a transaction to insert user and vendor data
    await client.query("BEGIN");

    // Insert user data into the users table
    await client.query(
      "INSERT INTO users (User_ID, Username, Password, Email, Phone_No, UserType) VALUES ($1, $2, $3, $4, $5, $6)",
      [userId, username, hashedPassword, email, phoneNo, "Vendor"]
    );

    // Insert vendor data into the vendors table
    await client.query(
      "INSERT INTO vendors (Vendor_ID, User_ID, Vendor_Name, Vendor_Desc, Image_Path,avg_time) VALUES ($1, $2, $3, $4, $5,$6)",
      [vendorId, userId, vendorName, vendorDesc, imagePath,avg_time]
    );

    // Commit the transaction
    await client.query("COMMIT");

    res.status(201).json({ message: "Vendor registered successfully" });
  } catch (error) {
    // Rollback the transaction if any error occurs
    await client.query("ROLLBACK");
    console.error("Error registering vendor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

vendorRouter.get("/all", async (req, res) => {
  try {
    const result = await client.query(`
      SELECT vendors.*, vendor_ratings.Overall_Rating
      FROM vendors
      LEFT JOIN vendor_ratings ON vendors.Vendor_ID = vendor_ratings.Vendor_ID;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching vendors with ratings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Get details of one specific vendor by ID

vendorRouter.get("/:vendorId", async (req, res) => {
  const vendorId = req.params.vendorId;

  try {
    const query = `
    SELECT menu_items.*, vendors.*, 
             AVG(vendor_ratings.overall_rating) as vendor_avg_rating, 
             AVG(item_ratings.item_rating) as item_avg_rating
      FROM menu_items
      INNER JOIN vendors ON menu_items.Vendor_ID = vendors.Vendor_ID
      LEFT JOIN vendor_ratings ON vendors.Vendor_ID = vendor_ratings.Vendor_ID
      LEFT JOIN item_ratings ON menu_items.Item_ID = item_ratings.Item_ID
      WHERE vendors.Vendor_ID = $1
      GROUP BY menu_items.Item_ID, vendors.Vendor_ID;
    `;
    const result = await client.query(query, [vendorId]);
    const menuItems = result.rows;
    res.json(menuItems);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
  }
});

vendorRouter.post("/:vendorId/item", async (req, res) => {
  const vendorId = req.params.vendorId;

  // Generate a random Item_ID between 1 and 100
  const itemId = Math.floor(Math.random() * 100) + 1;

  try {
    // Check if an item with the same name already exists
    const checkQuery = `
      SELECT COUNT(*) AS count
      FROM menu_items
      WHERE Item_Name = $1;
    `;
    const checkResult = await client.query(checkQuery, [req.body.itemName]);
    const itemExists = checkResult.rows[0].count > 0;

    if (itemExists) {
      // If the item already exists, return an error
      return res
        .status(400)
        .json({ error: "Item with the same name already exists" });
    } else {
      // If the item does not exist, insert the new item into the menu_items table
      const insertQuery = `
        INSERT INTO menu_items (Vendor_ID, Item_ID, Category_ID, Item_Name, Item_Description, Price, Image_URL)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const result = await client.query(insertQuery, [
        vendorId,
        itemId,
        req.body.categoryId, // Assuming you have categoryId in the request body
        req.body.itemName,
        req.body.itemDesc,
        req.body.itemPrice,
        req.body.itemImage,
      ]);
      res.json(result.rows);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
  }
});

vendorRouter.put("/item/:itemId",authenticateToken, async (req, res) => {
  const itemId = req.params.itemId;
  const { itemName, itemDesc, itemPrice, itemImage } = req.body;

  try {
    const query = `
      UPDATE menu_items
      SET Item_Name = $1, Item_Description = $2, Price = $3, Image_URL = $4
      WHERE Item_ID = $5
      RETURNING *;
    `;
    const result = await client.query(query, [
      itemName,
      itemDesc,
      itemPrice,
      itemImage,
      itemId,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
  }
});
vendorRouter.delete("/item/:itemId",authenticateToken, async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const query = `
      DELETE FROM menu_items
      WHERE Item_ID = $1
      RETURNING *;
    `;
    const result = await client.query(query, [itemId]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = vendorRouter;
