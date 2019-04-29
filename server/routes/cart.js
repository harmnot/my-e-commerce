import express from "express";
const router = express.Router();
import {
  PersonService,
  ProductService,
  CartService
} from "../controller/index.js";
import authentic from "../middleware/authentication";
import auhthorization from "../middleware/authorization";

router.get("/getcarts", authentic, CartService.getCarts);
router.get("/getcartpaid", CartService.getCartspaid);
router.get("/getoneproduct/:id", authentic, CartService.getone);
router.post("/addcart", authentic, CartService.add);
router.delete("/delete/:id", authentic, CartService.remove);
router.put("/updatepaid", authentic, CartService.updatepaid);

router.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
