const mongoose = require('mongoose');
const customerSchema = require('./customerSchema');

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
