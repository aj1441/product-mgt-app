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
const allowedOrigins = ['https://aj-product-management-app.netlify.app'];


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
  console.log("Adding feedback:", obj); // Log the object being added
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




//API endpoints

//POST   /api/feedback          # Create new feedback
app.post("/api/add-feedback", async (req, res) => {
  console.log("Received feedback data:", req.body); // Log the received data
  // Validate the request body
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
  console.log("Fetching all feedback");
// Fetch all feedback entries
let feedback = await getAllFeedback(req.body);
console.log("Feedback fetched:", feedback); // Log the fetched feedback
res.json(feedback);
});

// GET    /api/feedback/:id      # Get a single feedback entry with comments
app.get("/api/feedback/:category", async (req, res) => {
  console.log("Fetching feedback for category:", req.params);
  // Fetch feedback for a specific category
  const { category } = req.params;
  try {
    const feedback = await getFeedback(category);
    console.log("Feedback fetched for category:", feedback); // Log the fetched feedback
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




