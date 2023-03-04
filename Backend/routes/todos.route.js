const { Router } = require("express");

const { TodoModel } = require("../models/todos.model");

const TodosController = Router();

TodosController.get("/", async (req, res) => {
  const todos = await TodoModel.find();
  res.send(todos);
});

TodosController.post("/create", async (req, res) => {
  const payload = req.body;

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  //console.log(formattedDate);

  if (payload.taskname) {
    const new_todo = new TodoModel({ ...payload, date: formattedDate });
    await new_todo.save();

    res.send({ msg: "Todo added successfully" });
  } else {
    res.send({ msg: "please fill todo" });
  }
});

TodosController.put("/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const payload = req.body;
  const new_todo = await TodoModel.updateOne(
    {
      _id: todoId,
    },
    {
      $set: payload,
    }
  );

  res.send({ msg: "Todo updated successfully" });
});

TodosController.delete("/:todoId", async (req, res) => {
  const { todoId } = req.params;

  const new_todo = await TodoModel.deleteOne({
    _id: todoId,
  });

  res.send("todo successfully deleted");
});

module.exports = {
  TodosController,
};
