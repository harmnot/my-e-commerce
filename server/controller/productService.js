import { Person, Product } from "../model";

class ProductService {
  static async addProduct(req, res, next) {
    try {
      if (req.file && req.file.gcsUrl) {
        const addProduct = await Product.create({
          productName: req.body.productName,
          stock: req.body.stock,
          desc: req.body.desc,
          price: req.body.price,
          image: req.file.gcsUrl
        });
        res.status(201).json(addProduct);
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  static async listproducts(req, res, next) {
    try {
      const list = await Product.find({});
      res.status(200).json(list);
    } catch (e) {
      next(e);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const tryingDelete = await Product.findByIdAndDelete(req.params.id);
      res.status(201).json(tryingDelete);
    } catch (e) {
      next(e);
    }
  }

  static async updated(req, res, next) {
    try {
      const editable = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { runValidators: true }
      );
      res.status(200).json(editable);
    } catch (e) {
      next(e);
    }
  }

  static async findOne(req, res, next) {
    try {
      const find = await Product.findOne({ _id: req.params.id });
      if (!find) {
        res.status(400).json({ error: `can't found any` });
      } else {
        res.status(200).json(find);
      }
    } catch (e) {
      next(e);
    }
  }
}

export default ProductService;
