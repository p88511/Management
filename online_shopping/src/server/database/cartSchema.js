const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true,
    },
    product_id: {
        type: String, 
        required: true, 
    },
    product_name: {
        type: String, 
    },
    amount: {
        type: String, 
        required: true,
    }, 
    user_id: {
        type: String, 
        required: true, 
    }
},{
    timestamps: true, 
});

module.exports = cartSchema;