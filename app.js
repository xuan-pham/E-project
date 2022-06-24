import express from "express";
import morgan from "morgan";
import "dotenv/config";
import route from "./src/router/index-router.js";
import connectDB from "./src/config/mongo-db.js";

// PORT
const PORT = process.env.PORT || 3000;

// create server
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// server running
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
    route(app);
    connectDB();
});
