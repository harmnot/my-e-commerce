import { jwtSigin, verifyJwt } from "../helper/jwt.js";
import { Person, Product } from "../model";

const authentic = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(400).json({ error: "no token " });
  } else {
    try {
      const decoded = verifyJwt(token);
      const isAuth = await Person.findOne({ _id: decoded._id });
      if (!isAuth) {
        res.status(400).json({ error: `you are not authentic` });
      } else {
        // keys : _id, role, username
        req.user = decoded;
        next();
      }
    } catch (e) {
      next(e);
    }
  }
};

export default authentic;
