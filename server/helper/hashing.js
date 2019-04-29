import bcrypt from "bcryptjs";

const hashingThisPassoword = user => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(+process.env.SALT, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
};

const comparePassword = (reqBody, hashPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(reqBody, hashPassword, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

export { hashingThisPassoword, comparePassword };
