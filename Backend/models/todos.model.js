const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  taskname: { type: String, required: true },
  date: { type: String },
});

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = {
  TodoModel,
};
