import { Person, Product, Cart, DummyMoney } from "../model/index.js";
import authentic from "../middleware/authentication";
import { verifyJwt } from "../helper/jwt.js";

class CartService {
  static async getCarts(req, res, next) {
    try {
      const getCarts = await Cart.find({ user: req.user._id }).populate("item");
      res.status(200).json(getCarts);
    } catch (e) {
      next(e);
    }
  }

  static async add(req, res, next) {
    try {
      const product = await Cart.create({
        user: req.user._id,
        item: req.body.item,
        amount: req.body.amount
      });
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }

  static async remove(req, res, next) {
    try {
      const destroy = await Cart.findOneAndDelete({ _id: req.params.id });
      res.status(200).json(destroy);
    } catch (e) {
      next(e);
    }
  }

  static async getCartspaid(req, res, next) {
    try {
      const token = req.header("token");
      const user = verifyJwt(token);
      const getPaid = await Cart.find({ user: user._id, paid: { $ne: true } });

      if (!getPaid.length) {
        res.status(204).json({ error: `can't found any` });
      } else {
        res.status(200).json(getPaid);
      }
    } catch (e) {
      next(e);
    }
  }

  static async getone(req, res, next) {
    try {
      const geet = await Product.findOne({ _id: req.params.id });
      res.status(200).json(geet);
    } catch (e) {
      next(e);
    }
  }

  static async updatepaid(req, res, next) {
    try {
      const allupdate = await Cart.update(
        { _id: { $in: req.body.items } },
        {
          $set: {
            paid: true
          }
        },
        { multi: true }
      );
      res.status(200).json(allupdate);
    } catch (e) {
      next(e);
    }
  }
}

export default CartService;
