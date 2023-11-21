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

router.get("/create-list", (req, res) => {
  const placesFilePath = path.join(__dirname, "../public/js/data-places.json");

  fs.readFile(placesFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading places JSON file:", err);
      return res.status(500).send("Internal Server Error");
    }

    const places = JSON.parse(data); // Parse JSON data

    res.render("create-list", { places: places }); // Pass places data to the template
    // res.send(places);
  });
});

module.exports = router;
