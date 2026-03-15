import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebHooks.js";


await connectDB(); //Establish connection to MongoDB

const app = express(); //Initialize Express Application
app.use(cors()); //Enable cross-origin resource sharing

//Middleware Setup
app.use(express.json()) //Enable JSON request body parsing
app.use(clerkMiddleware())

//API to listen Clerk Webhooks
app.use("/api/clerk", clerkWebhooks)

//Route endpoint to check API status
app.get("/", (req, res) => {
    res.send("API successfully connected");
});

const port = process.env.PORT || 4000; //Define Server Port

//Start the server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

export default app