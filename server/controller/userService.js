import { Person, Product } from "../model";
import { comparePassword } from "../helper/hashing";
import { jwtSigin, verifyJwt } from "../helper/jwt.js";

export default class PersonService {
  static async register(req, res, next) {
    try {
      const addUser = await Person.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }]
      });
      if (addUser) {
        res.status(403).json({ error: "user already exist" });
      } else {
        const tryingRegister = await Person.create({ ...req.body });
        res
          .status(200)
          .json({ msg: `successfully register`, data: tryingRegister });
      }
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const tryingLogin = await Person.findOne({
        $or: [{ username: req.body.input }, { email: req.body.input }]
      });
      if (!tryingLogin) {
        res.status(400).json({ error: "you are not registered yet" });
      } else {
        const password = await comparePassword(
          req.body.password,
          tryingLogin.password
        );
        if (!password) {
          res.status(400).json({ error: `password incorrect` });
        } else {
          const token = jwtSigin({
            _id: tryingLogin._id,
            role: tryingLogin.role,
            username: tryingLogin.username
          });

          res.status(200).json({ msg: `success to login`, token, tryingLogin });
        }
      }
    } catch (e) {
      next(e);
    }
  }
}
