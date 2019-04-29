import express from "express";
const router = express.Router();
import { PersonService, ProductService } from "../controller/index.js";
import authentic from "../middleware/authentication";
import auhthorization from "../middleware/authorization";
import Multer from "multer";
import gcsMiddlewares from "../middleware/google-cloud-middleware.js";

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Maximum file size is 10MB
  }
});

router.get("/listproducts", ProductService.listproducts);
router.post(
  "/addproduct",
  authentic,
  auhthorization,
  multer.single("image"),
  gcsMiddlewares.sendUploadToGCS,
  ProductService.addProduct
);

// router.post(
//   "/addproduct",
//   multer.single("image"),
//   gcsMiddlewares.sendUploadToGCS,
//   ProductService.addProduct
// );

router.put("/update/:id", authentic, auhthorization, ProductService.updated);
// router.put("/update/:id", ProductService.updated);

router.delete(
  "/delete/:id",
  authentic,
  auhthorization,
  ProductService.deleteProduct
);

// router.delete("/delete/:id", ProductService.deleteProduct);

router.use((err, req, res, next) => {
  console.log(err, "iniiii error");
  if (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
