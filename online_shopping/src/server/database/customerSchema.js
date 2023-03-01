// setup schema => setup modedl => use the model you created to query, update, delete entity in your database 
const mongoose = require('mongoose');



const customerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String, 
        required: true, 
    }, 
    isLoggedIn: {
        type: Boolean, 
        default: false,
    }, 
    id: {
        type: String, 
        required: true,
    }, 
    isAdmin: {
        type: Boolean, 
        default: false, 
    }
},{
    timestamps: true, 
});

module.exports = customerSchema;