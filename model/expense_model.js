const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    category: {type: String, required: true},
    amount:{type: Number, required: true},
    date: {type: Date, required: true},
    description: String,
    username: {type: String, required: true},
    isShared: {type: Boolean, require: true, default: false}
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;