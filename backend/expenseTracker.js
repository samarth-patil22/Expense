const mongoose = require("mongoose");

const expenceSchema = new mongoose.Schema({
  title: String,
  amount: Number,
});

const expense_Traker = mongoose.model("expense", expenceSchema);

module.exports = expense_Traker;

expense_Traker.js;
