const mongoose = require('mongoose');
const promoCodeSchema = require('./promoCodeSchema');

const Promocode = mongoose.model('Promocode', promoCodeSchema);
module.exports = Promocode;
