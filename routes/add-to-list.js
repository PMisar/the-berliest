const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.post("/add-to-list", (req, res) => {
  const { name } = req.body;
  // console.log("NAME", name);

  User.findByIdAndUpdate(
    req.session.currentUser._id,
    { $push: { favoriteList: name } },
    { new: true }
  )
    .then((user) => {
      console.log("USER", user);
      res.redirect("create-list");
      // res.render("create-list", { favoriteList: user.favoriteList });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create-list", (req, res) => {
  res.render("create-list", { favoriteList: User.favoriteList });
});

module.exports = router;
