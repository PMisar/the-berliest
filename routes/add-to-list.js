const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const path = require("path");
const fs = require("fs");
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
  console.log("I am working!");
  const placesFilePath = path.join(__dirname, "../db/data-places.json");
  console.log("I AM THIS USER =", req.session.currentUser._id);

  User.findById(req.session.currentUser._id)
    .then((user) => {
      console.log(user.favoriteList);
      //

      fs.readFile(placesFilePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading places JSON file:", err);
          return res.status(500).send("Internal Server Error");
        }

        const places = JSON.parse(data); // Parse JSON data

        res.render("create-list", {
          places: places,
          favorites: user.favoriteList,
          username: user.username,
        }); // Pass places data to the template
        // res.send(places);
      });

      //
    })
    .catch(() => {
      res.status(404).send("USER NOT FOUND");
    });
});
module.exports = router;
