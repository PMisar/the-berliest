// const express = require("express");
// const router = express.Router();
// const Place = require("../models/Place.model"); // Import your Place model

// router.get("/create-list", (req, res, next) => {
//   Place.find()
//     .then((places) => {
//       console.log(places);
//       res.render("create-list", { places: places }); // not working yet
//       // res.send(places);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

module.exports = router;
