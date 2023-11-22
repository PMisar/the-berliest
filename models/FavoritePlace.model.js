const mongoose = require('mongoose');

const favoritePlaceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: String, // Adjust the type based on your data type for latitude
    required: true,
  },
  lon: {
    type: String, // Adjust the type based on your data type for longitude
    required: true,
  },
});

const FavoritePlace = mongoose.model('FavoritePlace', favoritePlaceSchema);

module.exports = FavoritePlace;

