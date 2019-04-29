require("dotenv").config();
import jwt from "jsonwebtoken";

const jwtSigin = obj => {
  return jwt.sign(obj, process.env.PRIVATE_KEY, { expiresIn: 36000 });
};

const verifyJwt = token => {
  return jwt.verify(token, process.env.PRIVATE_KEY);
};

export { jwtSigin, verifyJwt };
