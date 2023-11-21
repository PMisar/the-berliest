const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.post("/add-to-list", (req, res) => {
  const { name } = req.body;
  console.log("NAME", name);

  User.findOneAndUpdate()
    .then((user) => {
      console.log("USER", user);
      res.redirect("/create-list");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
