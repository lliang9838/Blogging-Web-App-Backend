var bcrypt = require("bcrypt");

bcrypt.genSalt(10, function (err, salt) {
  bcrypt.hash("B4c0//", salt, function (err, hash) {
    console.log("hash: ", hash);
  });
});
