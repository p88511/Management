// setup schema => setup modedl => use the model you created to query, update, delete entity in your database
const mongoose = require("mongoose");

const promoCodeSchema = new mongoose.Schema({
  promocode: {
    type: String,
    required: true,
  },

  discount: {
    type: String, 
    required: true,
  }
});

module.exports = promoCodeSchema;
