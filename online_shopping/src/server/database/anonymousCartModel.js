const mongoose = require('mongoose');
const anonymousCartSchema = require('./anonymousCartSchema');

const AnonymousCart = mongoose.model('AnonymousCart', anonymousCartSchema);
module.exports = AnonymousCart;
