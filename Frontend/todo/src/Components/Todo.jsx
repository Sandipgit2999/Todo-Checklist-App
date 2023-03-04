import React from "react";
import { Draggable } from "react-beautiful-dnd";
// import "../Styles/Todo.module.css";
import "../Styles/Dashboard.module.css";

const Todo = ({ todo, index }) => {
  
  return (
    <div className="todo">
      {
        <Draggable key={todo._id} draggableId="todo1" index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {todo.taskname}
            </div>
          )}
        </Draggable>
      }
    </div>
  );
};

export default Todo;
