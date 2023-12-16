const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        reqired:true
    },
    lastname: {
        type: String,
        reqired:true
    },
    email: {
        type: String,
        reqired:true   
    },
    mobileNo: {
        type: Number,
        reqired: true,
        
    },
    address1: {   
        type: String,
        required:true
    },
    address2: {
        type: String,
    },
    country: {
        type: String,
        required:true
    },
    state: {
        type: String,
        required:true
    },
    city: {
        type: String,
        required:true
    },
    zipCode: {
        type: Number,
        required:true
    },
})
module.exports = mongoose.model('users',userSchema)