import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/db/index.js";
import todosRoutes from "./src/routes/todoroutes.js";
// import { edittodo } from "./src/controllers/todocontroller.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routes
app.use("/api/v1", todosRoutes);




connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️  Server is running at port : ${port}`);
    });
 
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
