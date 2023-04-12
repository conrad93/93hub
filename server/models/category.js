const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {type: String, require: true},
    code: {type: String, require: true, unique: true},
    status: {type: Number, default: 0}
}, {timestamps: true});

module.exports = mongoose.model("category", categorySchema);