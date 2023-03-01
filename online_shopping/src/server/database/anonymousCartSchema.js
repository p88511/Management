const mongoose = require('mongoose');

const anonymousCartSchema = new mongoose.Schema({
    ip: {
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
    }
},{
    timestamps: true, 
});

module.exports = anonymousCartSchema;