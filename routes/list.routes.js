const express = require("express");
const router = express.Router();
const Place = require("../models/Place.model"); // Import your Place model

router.get("/my-berliest", (req, res, next) => {
  Place.find()
    .then((places) => {
      console.log(places);
      res.render("my-berliest", { places: places }); // not working yet
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
