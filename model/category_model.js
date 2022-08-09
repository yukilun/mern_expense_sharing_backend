const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {type: String, required: true},
    icon_class: {type: String, required: true},
    color: {type: String, required: true}
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;