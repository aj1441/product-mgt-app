//Importing modules

import express from "express";
import pg from "pg";
import cors from "cors"; // Importing CORS to handle cross-origin requests  
const { Client } = pg;

// For remote deployment
let config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: true
}

const app = express();
const port = 3000;
// below for remote deployment
// const allowedOrigins = ['https://countriesapiversion5.netlify.app'];


//Enable CORS in your Express app
app.use(cors()); // This will allow all origins. You can also specify options to restrict it to certain domains if needed.  

// app.use(cors({
//   origin: 'http://localhost:5173',
// }));


//boilerplate code for express
app.use(express.json());

const client = new Client(config); //creating our database Client with our config values

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//helper functions

async function addFeedback(obj) {
  const client = new Client(config); // Create a new database client
  try {
    await client.connect(); // Connect to the database

    // Insert the user data into the database
    await client.query(
      `INSERT INTO feedback (title, category, description) VALUES ($1, $2, $3)`,
      [obj.title, obj.category, obj.description] // Use placeholders for dynamic values
    );
  } catch (error) {
    console.error("Error in addFeedback:", error);
    throw error; // Re-throw the error to handle it in the calling function
  } finally {
    await client.end(); // Ensure the database connection is closed
  }
}

async function getAllFeedback() {
  const client = new Client(config); //creating our database Client with our config values
  await client.connect();
  let result = await client.query(`SELECT * FROM feedback`);
  console.log(result.rows);
  await client.end();
  return result.rows;
} 

async function getFeedback(category) {
  const client = new Client(config); //creating our database Client with our config values
  await client.connect();
  let result = await client.query(
    `SELECT * FROM feedback WHERE category = '${category}'`
  );
  console.log(result.rows);
  await client.end();
  return result.rows;
}

//get country click count
// async function getCountryClickCount(country_code) {
//   const client = new Client(config);
//   await client.connect();

//   const result = await client.query(
//     `SELECT * FROM country_clicks WHERE country_code = $1`,
//     [country_code]
//   );

//   await client.end();
//   return result.rows.length > 0 ? result.rows[0].country_count : 0;
// }

//helper function to get all country clicks
// async function getAllCountryClickCounts() {
//   const client = new Client(config);
//   await client.connect();

//   const result = await client.query(
//     `SELECT country_code, country_count FROM country_clicks`
//   );

//   await client.end();

//   // Convert array of rows to an object map
//   const counts = {};
//   result.rows.forEach(row => {
//     counts[row.country_code] = row.country_count;
//   });

//   return counts;
// }


//helper function to check if country code exists in the database, if it does, increment the country_count by 1, if it doesn't, add the country code to the database with a country_count of 1
// async function addCountryClick(country_code) {
//   const client = new Client(config); // Creating our database Client with our config values
//   await client.connect(); // Connecting to the database

//   // Increment the country_count by 1, or initialize it with 1 if it doesn't exist; $1 placeholder for country_code and 1 for the first time it was clicked; ON CONFLICT is used to handle the case when the country_code already exists; DO UPDATE SET is used to increment the country_count by 1; [value]
//   const result = await client.query(
//     `INSERT INTO country_clicks (country_code, country_count) 
//          VALUES ($1, 1) 
//          ON CONFLICT (country_code) 
//          DO UPDATE SET country_count = country_clicks.country_count + 1
//          RETURNING country_count`, // Return the updated country_count
//     [country_code]
//   );
//   await client.end(); // Ensure the database connection is closed
//   // Return the updated country_count
//   return result.rows[0].country_count;
// }



//API endpoints

//POST   /api/feedback          # Create new feedback
app.post("/api/add-feedback", async (req, res) => {
  const { title, category, description } = req.body;
  try {
    await addFeedback(req.body);
    res.status(201).json({ message: "Feedback added successfully" });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//GET    /api/feedback          # List all feedback
app.get("/api/feedback", async (req, res) => {
let feedback = await getAllFeedback(req.body);
res.json(feedback);
});

// GET    /api/feedback/:id      # Get a single feedback entry with comments
app.get("/api/feedback/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const feedback = await getFeedback(category);
    res.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//--------------------------------May use later for stretch goals----------------------------
// PUT    /api/feedback/:id      # Update feedback
// DELETE /api/feedback/:id      # Delete feedback

// POST   /api/comments          # Add a comment
// POST   /api/replies           # Add a reply to a comment
// POST   /api/upvote            # Upvote feedback




