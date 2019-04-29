import express from "express";
const router = express.Router();
import {
  PersonService,
  ProductService,
  CartService,
  GoCheckout
} from "../controller/index.js";
import authentic from "../middleware/authentication";
import auhthorization from "../middleware/authorization";

router.get("/alllist", authentic, GoCheckout.getAll);
router.get("/list/:status", GoCheckout.find);
router.get("/listuser/:status", GoCheckout.findforUser);
router.post("/add", authentic, GoCheckout.create);
router.put("/update/:id", GoCheckout.update);

export default router;
