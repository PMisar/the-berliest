const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const FavoritePlace = require("../models/FavoritePlace.model");
const path = require("path");
const fs = require("fs");
const Place = require("../models/Place.model");

router.post("/add-to-list", (req, res) => {
  const { name, category } = req.body;
  User.findByIdAndUpdate(
    req.session.currentUser._id,
    { $push: { favoriteList: name } },
    { new: true }
  )
    .then((user) => {
      if (category === "all") {
        res.redirect(`/create-list?category=all`);
        return;
      }
      res.redirect(`/create-list?category=${category}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/remove-from-list", (req, res) => {
  const { name, category } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("Invalid name provided");
  }

  User.findByIdAndUpdate(
    req.session.currentUser._id,
    { $pull: { favoriteList: name } },
    { new: true }
  )
    .then((user) => {
      if (category === "all") {
        res.redirect(`/create-list?category=all`);
        return;
      }
      res.redirect(`/create-list?category=${category}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create-list", async (req, res) => {
  let { category } = req.query;
  if (!category) {
    category = "all";
  }
  const placesFilePath = path.join(__dirname, "../db/data-places.json");
  const foundUser = await User.findById(req.session.currentUser._id);
  let allCategories = await Place.find();
  allCategories = allCategories.map((place) => place.category);
  !allCategories.includes("all") && allCategories.unshift("all");
  allCategories = [...new Set(allCategories)];
  allCategories = allCategories.filter((place) => place !== category);
  // return res.send(allCategories);

  fs.readFile(placesFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading places JSON file:", err);
      return res.status(500).send("Internal Server Error");
    }

    const places = JSON.parse(data); // Parse JSON data
    let filteredPlaces = places.filter(
      (place) => !foundUser.favoriteList.includes(place.name)
    );

    if (category && category !== "all") {
      filteredPlaces = places.filter(
        (place) =>
          place.category === category &&
          !foundUser.favoriteList.includes(place.name)
      );
    }

    res.render("create-list", {
      places: filteredPlaces,
      favorites: foundUser.favoriteList,
      username: foundUser.username,
      allCategories,
      category,
    }); // Pass places data to the template
  });
  return;
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
          };
        });

        res.render("my-berliest", {
          favorites: user.favoriteList,
          coordinates: favoritesWithCoords,
        });
      });
    })
    .catch(() => {
      res.status(404).send("USER NOT FOUND");
    });
});

module.exports = router;
