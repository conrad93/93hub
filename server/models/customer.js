const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    first_name: {type: String},
    last_name: {type: String},
    password: {type: String, require: true},
    token: {type: String},
    status: {type: Number, default: 1},
    email: {type: String},
    isd: {type: String},
    phone_no: {type: String},
    address: {type: String},
    city: {type: String},
    country: {type: String},
    nationality: {type: String},
    dob: {type: String},
}, {timestamps: true});

module.exports = mongoose.model("customer",customerSchema);