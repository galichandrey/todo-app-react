import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import Header from "../widgets/Header";
import Footer from "../widgets/Footer";
import TaskList from "../widgets/TaskList";

import "./App.css";

const createTodoItem = (todoText = "My Task", timeLeft = 0, taskCreationDate = new Date(Date.now())) => ({
  id: uuid(),
  taskText: todoText,
  taskCreationDate,
  done: false,
  timeLeft,
  timerId: 0,
});

const tasksInitial = [
  createTodoItem("First task", 95, new Date("Feb 15 2023 09:03:27")),
  createTodoItem("Second task", 111, new Date("Feb 15 2023 10:23:27")),
  createTodoItem("Another task", 1110, new Date("Feb 15 2023 10:33:27")),
  createTodoItem("Some task", 100, new Date("Feb 15 2023 10:43:27")),
  createTodoItem("Super task!", 10, new Date("Feb 15 2023 11:53:27")),
];

function App() {
  const [tasks, setTasks] = useState(tasksInitial);

  const [filter, setFilter] = useState("all");
  const addItem = (text, timeLeft) => {
    if (!text.trim()) return;
    const newItem = createTodoItem(text, timeLeft);
    const newArray = [...tasks, newItem];
    setTasks(newArray);
  };

  const onToggleDone = (id) => {
    const index = tasks.findIndex((element) => element.id === id);

    const oldItem = tasks[index];
    const newItem = { ...oldItem, done: !oldItem.done };

    const before = tasks.slice(0, index);
    const after = tasks.slice(index + 1);

    const newArray = [...before, newItem, ...after];
    setTasks(newArray);
  };

  const onFiltered = (filt) => {
    setFilter(filt);
  };

  const editTask = (id, text) => {
    const index = tasks.findIndex((element) => element.id === id);

    const oldItem = tasks[index];

    const newItem = { ...oldItem, taskText: text };

    const before = tasks.slice(0, index);
    const after = tasks.slice(index + 1);

    const newArray = [...before, newItem, ...after];
    setTasks(newArray);
  };

  const filterFunc = (filt) => {
    switch (filt) {
      case "all":
        return tasks;

      case "active":
        return tasks.filter((element) => !element.done);

      case "completed":
        return tasks.filter((element) => element.done);

      default:
        return tasks;
    }
  };

  const deleteItem = (id) => {
    const index = tasks.findIndex((element) => element.id === id);

    const before = tasks.slice(0, index);
    const after = tasks.slice(index + 1);

    const newArray = [...before, ...after];
    setTasks(newArray);
  };

  const clearCompleted = () => {
    const newArray = [...tasks];
    const clearedArray = newArray.filter((element) => !element.done);
    setTasks(clearedArray);
  };

  const updateTimeLeft = (id, timeLeft = 0) => {
    const index = tasks.findIndex((element) => element.id === id);
    const oldItem = tasks[index];
    const newItem = { ...oldItem, timeLeft };
    const before = tasks.slice(0, index);
    const after = tasks.slice(index + 1);
    const newArray = [...before, newItem, ...after];
    setTasks(newArray);
  };

  const visibleTasks = filterFunc(filter);

  return (
    <section className="todoapp">
      <Header addItem={addItem} />

      <section className="main">
        <TaskList
          tasks={visibleTasks}
          onToggleDone={onToggleDone}
          onDeleted={deleteItem}
          editTask={editTask}
          updateTimeLeft={updateTimeLeft}
        />
        <Footer
          tasks={tasks}
          filter={filter}
          onFiltered={onFiltered}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
}

export default App;
