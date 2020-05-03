var bcrypt = require("bcrypt");
const config = require("universal-config");
const dotenv = require("dotenv");
dotenv.config();

bcrypt.genSalt(10, function (err, salt) {
  bcrypt.hash("liang", salt, function (err, hash) {
    console.log("hash: ", hash);
  });
});
