import axios from "axios";
import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Todo from "./Todo";
import "../Styles/Addtodo.module.css";

const Addtodo = ({ setload, load }) => {
  const [todo, setTodo] = useState("");
  const [note, setNote] = useState("");
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState([]);

  const Addtodo = () => {
    axios
      .post("http://localhost:8080/todos/create", { taskname: todo, note })
      .then((res) => {
        console.log(res);

        setNote("");
        setTodo("");
        getTodo();
        setload(!load);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (id, e) => {
    console.log(e);

    if (e.target.checked) {
      alert("Are you sure you want to delete todo");
      axios
        .delete(`http://localhost:8080/todos/${id}`)
        .then((res) => {
          console.log(res);
          getTodo();
          setload(!load);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getTodo = () => {
    axios
      .get("http://localhost:8080/todos")
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
        setData(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dragStart = (e, id) => {
    console.log("Drag has started");
    e.dataTransfer.setData("_id", id);
  };

  const draggingOver = (e) => {
    e.preventDefault();
    console.log("Dragging over now");
  };

  const dragDropped = (e) => {
    console.log("You have dropped");
    let transferedtodoid = e.dataTransfer.getData("_id");
    console.log(transferedtodoid);
  };

  useEffect(() => {
    getTodo();
  }, []);

  const handleMonth = (e) => {
    console.log(typeof e.target.value);

    let date = new Date("2022-03-01").getMonth();
    console.log(typeof date, date, "dkkd");

    const fiteredData = [...todos].filter(
      (item) => item.date.split("-")[1] === e.target.value
    );

    setData(fiteredData);

    console.log(fiteredData, "filrtrkjf");
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <input
          type="text"
          placeholder="note "
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <button onClick={Addtodo}>Add</button>

      <Droppable droppableId="todo1">
        {(provided) => (
          <div
            className="container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map((todo, index) => (
              <div>
                <Todo todo={todo} index={index} />
                <input
                  type="checkbox"
                  onChange={(e) => handleChange(todo._id, e)}
                />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div>
        Fiter
        <select name="" onChange={handleMonth} id="">
        <option value="--"></option>
          <option value="01">Jan</option>
          <option value="02">Feb</option>
          <option value="03">Mar</option>
          <option value="04">Apr</option>
          <option value="05">May</option>
          <option value="06">Jun</option>
          <option value="07">July</option>
          <option value="08">Aug</option>
          <option value="09">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
      </div>
    </div>
  );
};

export default Addtodo;
