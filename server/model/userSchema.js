import mongoose from "mongoose";
import { hashingThisPassoword } from "../helper/hashing";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, "username already exist"],
    required: [true, "please fill your usernmae"]
  },
  email: {
    type: String,
    unique: [true, "email already exist"],
    required: [true, "please fill your email adress"],
    validate: {
      validator: function(v) {
        let b = v.toLowerCase();
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(b);
      },
      message: "please use a valid email address"
    }
  },
  password: {
    type: String,
    required: [true, "please fill your password"],
    validate: {
      validator: function(v) {
        if (v.length < 7) {
          return false;
        }
      },
      message: "please use string password, more than 7 chars"
    }
  },
  name: {
    type: String,
    required: [true, "please fill your name"],
    validate: {
      validator: function(v) {
        if (v.length < 3) {
          return false;
        }
      },
      message: "please with full name"
    }
  },
  gender: {
    type: String,
    enum: ["Male", "Female"]
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  role: {
    type: String,
    default: "customer"
  },
  money: {
    type: Number,
    default: 0
  }
});

userSchema.pre("save", function(next) {
  let user = this;
  hashingThisPassoword(user)
    .then(response => {
      user.password = response;
      next();
    })
    .catch(err => next(err));
});

userSchema.pre("save", function(next) {
  let now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Person = mongoose.model("Person", userSchema);
export default Person;
