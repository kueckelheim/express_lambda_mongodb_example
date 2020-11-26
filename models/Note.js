const mongoose = require("mongoose");
const { getConnection } = require("../mongoose");
const conn = getConnection();
const Schema = mongoose.Schema;

module.exports = conn.model(
  "Note",
  new Schema({ text: { type: String, required: true } })
);
