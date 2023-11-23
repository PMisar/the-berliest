const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const FavoritePlace = require("../models/FavoritePlace.model");
const path = require("path");
const fs = require("fs");
const Place = require("../models/Place.model");

router.post("/add-to-list", (req, res) => {
  const { name } = req.body;
  // console.log(req.body.name);

  User.findByIdAndUpdate(
    req.session.currentUser._id,
    { $push: { favoriteList: name } },
    { new: true }
  )
    .then((user) => {
      //   console.log(user.favoriteList);
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

// router.post("/select-category", (req, res) => {
//   const { category } = req.body;
//   // console.log(category);

//   Place.findOneAndUpdate(
//     { category: category },
//     { $push: { selectedCategory: category } },
//     { new: true }
//   )
//     .then((place) => {
//       // console.log(place.selectedCategory);
//       res.redirect("create-list");
//       // res.render("create-list", { favoriteList: user.favoriteList });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // werkt nog niet, uitprobeer route
// router.get("/create-list", (req, res) => {
//   const selectedCategory = req.query.category;
//   console.log(selectedCategory);
//   Place.find({ category: selectedCategory })
//     .then((places) => {
//       User.findById(req.session.currentUser._id)
//         .then((user) => {
//           const favorites = user.favoriteList;

//           const filteredPlaces = places.filter(
//             (place) => !favorites.includes(place.name)
//           );

//           let categoryFilteredPlaces = filteredPlaces;

//           if (selectedCategory && selectedCategory !== "all") {
//             categoryFilteredPlaces = filteredPlaces.filter(
//               (place) => place.selectedCategory === selectedCategory
//             );
//           }

//           res.render("create-list", {
//             places: categoryFilteredPlaces,
//             favorites: favorites,
//             username: user.username,
//           });
//         })
//         .catch((userErr) => {
//           console.error("User findById Error:", userErr);
//           res.status(500).send("Internal Server Error");
//         });
//     })
//     .catch((placeErr) => {
//       console.error("Place find Error:", placeErr);
//       res.status(500).send("Internal Server Error");
//     });
// }); // werkt nog niet!

router.get("/create-list", async (req, res) => {
  const { category } = req.query;
  const placesFilePath = path.join(__dirname, "../db/data-places.json");
  const foundUser = await User.findById(req.session.currentUser._id);
  let allCategories = await Place.find();
  allCategories = allCategories.map((place) => place.category);
  allCategories.unshift("all");
  allCategories = [...new Set(allCategories)];
  allCategories = allCategories.filter((place) => place !== category);
  fs.readFile(placesFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading places JSON file:", err);
      return res.status(500).send("Internal Server Error");
    }

    const places = JSON.parse(data); // Parse JSON data
    let filteredPlaces = places.filter(
      (place) => !foundUser.favoriteList.includes(place.name)
    );

    if (category) {
      filteredPlaces = places.filter((place) => place.category === category);
    }

    // return res.send(filteredPlaces);

    res.render("create-list", {
      places: filteredPlaces,
      favorites: foundUser.favoriteList,
      username: foundUser.username,
      allCategories,
      category: category === "all" ? null : category,
    }); // Pass places data to the template
    // res.send(places);
  });
  return;
  User.findById(req.session.currentUser._id)
    .then((user) => {
      let favorites = user.favoriteList;
      // console.log(favorites);

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
          category: category,
        }); // Pass places data to the template
        // res.send(places);
      });

      //
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
