require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

import { Person, Product } from "./model/index.js";
import product from "./routes/product_routes.js";
import user from "./routes/user_routes";
import cart from "./routes/cart.js";
import checkout from "./routes/checkout.js";

const uri = `mongodb+srv://${process.env.MONGO_DB_NAME}:${
  process.env.MONGO_DB_KEY
}@hamrnot-iasow.mongodb.net/${
  process.env.MONGO_DB_DATABASE_NAME
}?retryWrites=true`;

mongoose
  .connect(
    uri,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`==========> MongoDB connected <==========`))
  .catch(err => console.log(err, "ini error"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use(morgan("tiny"));

app.use("/api/admin", product);
app.use("/api/user", user);
app.use("/api/cart", cart);
app.use("/api/checkout", checkout);

app.listen(port, () => {
  console.log(`you are connected on PORT : localhost:${port}`);
});

export default app;
