const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
    name: {type: String, require: true},
    code: {type: String, require: true, unique: true},
    template: {type: String, require: true},
    details: {type: Object, require: true},
    status: {type: Number, default: 0}
}, {timestamps: true});

module.exports = mongoose.model("template", TemplateSchema);