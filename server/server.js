import express from "express";
import mongoose from "mongoose";
import blogRouter from './routes/blog-routes.js'
import router from "./routes/user-routes.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);


import path from 'path';
const __dirname = path.resolve();
// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

mongoose
  .connect(
    "mongodb+srv://UserName:PassWord@cluster0.scnemhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("Connected TO Database and Listening TO Localhost 5000")
  )
  .catch((err) => console.log(err));
