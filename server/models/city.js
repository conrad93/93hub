const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    name: {type: String, require: true},
    code: {type: String, require: true, unique: true},
    countryCode: {type: String},
    status: {type: Number, default: 0}
}, {timestamps: true});

module.exports = mongoose.model("city", citySchema);