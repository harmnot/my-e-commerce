import { verifyJwt } from "../helper/jwt.js";
import { Person, Product } from "../model";

const auhthorization = async (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(401).json({ error: `you are unauthorized` });
  } else {
    next();
  }
};

export default auhthorization;
