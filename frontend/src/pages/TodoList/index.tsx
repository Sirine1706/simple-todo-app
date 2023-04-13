/** @format */

import { AddTask } from "../../Components/AddTask";
import { Task } from "../../Components/Task";

const TodoList = () => {
  return (
    <div className='todo_container'>
      <h1>My todo list</h1>
       <AddTask />
      <div className='tasks'>
        <Task />
        <button className='clear'>clear all</button>
      </div>
    </div>
  );
};
export default TodoList;
