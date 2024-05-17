// components/TodoList.js
"use client";
import { useState } from "react";

const page = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Todo List
      </h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow p-3 border text-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300"
        >
          Add
        </button>
      </div>
      <ul className="list-disc pl-5 space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300"
          >
            <span className="text-gray-700">{task}</span>
            <button
              onClick={() => removeTask(index)}
              className="text-red-500 hover:text-red-700 transition duration-300"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
