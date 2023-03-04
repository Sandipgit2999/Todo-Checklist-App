import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.module.css";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import Addtodo from "./Addtodo";
import { DragDropContext } from "react-beautiful-dnd";

const Dashboard = () => {
  console.log(Chart);

  const [todos, setTodos] = useState([]);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/todos")
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load]);

  const dateAdded = new Date("2022-01-01");
  console.log(dateAdded);

  const todosByDate = todos.reduce((acc, todo) => {
    acc[todo.date] = acc[todo.date] ? acc[todo.date] + 1 : 1;
    return acc;
  }, {});

  const handleDragEnd = (result) => {
    // if (!result.destination) return;
    // const items = Array.from(todos);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);
    // setTodos(items);
  };

  console.log("todosBydate", todosByDate);
  let tododate = [];
  let Totaltodo = [];
  for (const key in todosByDate) {
    tododate.push(key);
    Totaltodo.push(todosByDate[key]);
  }

  console.log(tododate, Totaltodo);

  const data = {
    labels: [...tododate],
    datasets: [
      {
        label: "Todos",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [...Totaltodo],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Sales in 2020",
      fontSize: 20,
    },
    legend: {
      display: true,
      position: "right",
    },
    scales: {
      y: {
        suggestedMin: 1,
        suggestedMax: 10,
      },
    },
  };

  return (
    <div className="parent">
      <Bar data={data} options={options} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Addtodo
          todos={todos}
          settodos={setTodos}
          load={load}
          setload={setLoad}
        />
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
