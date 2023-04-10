const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
    name: {type: String, require: true},
    code: {type: String, require: true, unique: true},
    isd: {type: String},
    flag: {type: String},
    status: {type: Number, default: 0}
}, {timestamps: true});

module.exports = mongoose.model("country", countrySchema);