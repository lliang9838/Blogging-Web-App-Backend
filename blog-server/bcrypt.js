var bcrypt = require("bcrypt");
const config = require("universal-config");

console.log(config.get("SECRET_KEY"));

bcrypt.genSalt(10, function (err, salt) {
  bcrypt.hash("B4c0//", salt, function (err, hash) {
    console.log("hash: ", hash);
  });
});
