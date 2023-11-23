const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const FavoritePlace = require('../models/FavoritePlace.model');
const path = require("path");
const fs = require("fs");

const Place = require("../models/Place.model");

router.post("/add-to-list", (req, res) => {
  const { name } = req.body;
  console.log(req.body.name);

  User.findByIdAndUpdate(
    req.session.currentUser._id,
    { $push: { favoriteList: name } },
    { new: true }
  )
    .then((user) => {
      //   console.log(user.favoriteList);
      res.redirect("create-list");
      // res.render("create-list", { favoriteList: user.favoriteList });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/remove-from-list", (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("Invalid name provided");
  }

  User.findByIdAndUpdate(
    req.session.currentUser._id,
    { $pull: { favoriteList: name } },
    { new: true }
  )
    .then((user) => {
      res.redirect("create-list");
      // res.render("create-list", { favoriteList: user.favoriteList });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create-list", (req, res) => {
  const placesFilePath = path.join(__dirname, "../db/data-places.json");

  User.findById(req.session.currentUser._id)
    .then((user) => {
      let favorites = user.favoriteList;
      console.log(favorites);

      fs.readFile(placesFilePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading places JSON file:", err);
          return res.status(500).send("Internal Server Error");
        }

        const places = JSON.parse(data); // Parse JSON data

        const filteredPlaces = places.filter(
          (place) => !favorites.includes(place.name)
        );

        res.render("create-list", {
          places: filteredPlaces,
          favorites: favorites,
          username: user.username,
          // selectedCategory: user.selectedCategory, // Pass the selectedCategory here
        });
      });
    })
    .catch(() => {
      res.status(404).send("USER NOT FOUND");
    });
});

router.get("/my-berliest", (req, res) => {
  const placesFilePath = path.join(__dirname, "../db/data-places.json");
  // console.log("I AM THIS USER =", req.session.currentUser._id);

  User.findById(req.session.currentUser._id)
    .then((user) => {
      fs.readFile(placesFilePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading places JSON file:", err);
          return res.status(500).send("Internal Server Error");
        }

        const places = JSON.parse(data);

        const favoritesWithCoords = user.favoriteList.map((favorite) => {
          const place = places.find((p) => p.name === favorite);

          return {
            name: favorite,
            lat: place ? place.lat : null,
            lon: place ? place.lon : null,
            category: place ? place.category : null,
          };
        });

        res.render("my-berliest", {
          favorites: user.favoriteList,
          coordinates: favoritesWithCoords,
          username: user.username,
        });
      });
    })
    .catch(() => {
      res.status(404).send("USER NOT FOUND");
    });
});

module.exports = router;
