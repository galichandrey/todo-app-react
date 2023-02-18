/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import { v4 as uuid } from "uuid";

import Header from "../widgets/Header";
import Footer from "../widgets/Footer";
import TaskList from "../widgets/TaskList";

import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        this.createTodoItem("First task", 95, new Date("Feb 15 2023 09:03:27")),
        this.createTodoItem("Second task", 111, new Date("Feb 15 2023 10:23:27")),
        this.createTodoItem("Another task", 1110, new Date("Feb 15 2023 10:33:27")),
        this.createTodoItem("Some task", 100, new Date("Feb 15 2023 10:43:27")),
        this.createTodoItem("Super task!", 10, new Date("Feb 15 2023 11:53:27")),
      ],
      filter: "all",
    };
  }

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((element) => element.id === id);

      const oldItem = tasks[index];
      const newItem = { ...oldItem, done: !oldItem.done };

      const before = tasks.slice(0, index);
      const after = tasks.slice(index + 1);

      const newArray = [...before, newItem, ...after];
      return {
        tasks: newArray,
      };
    });
  };

  onFiltered = (filter) => {
    this.setState({ filter });
  };

  editTask = (id, text) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((element) => element.id === id);

      const oldItem = tasks[index];

      const newItem = { ...oldItem, taskText: text };

      const before = tasks.slice(0, index);
      const after = tasks.slice(index + 1);

      const newArray = [...before, newItem, ...after];
      return {
        tasks: newArray,
      };
    });
  };

  filterFunc = (filter) => {
    const { tasks } = this.state;
    switch (filter) {
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

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((element) => element.id === id);

      const before = tasks.slice(0, index);
      const after = tasks.slice(index + 1);

      const newArray = [...before, ...after];

      return {
        tasks: newArray,
      };
    });
  };

  addItem = (text, timeLeft) => {
    if (!text.trim()) return;
    const newItem = this.createTodoItem(text, timeLeft);
    this.setState(({ tasks }) => {
      const newArray = [...tasks, newItem];
      return {
        tasks: newArray,
      };
    });
  };

  createTodoItem = (todoText = "My Task", timeLeft = 0, taskCreationDate = new Date(Date.now())) => ({
    id: uuid(),
    taskText: todoText,
    taskCreationDate,
    done: false,
    timeLeft,
    timerId: 0,
  });

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const newArray = [...tasks];
      const clearedArray = newArray.filter((element) => !element.done);

      return {
        tasks: clearedArray,
      };
    });
  };

  updateTimeLeft = (id, timeLeft = 0) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((element) => element.id === id);
      const oldItem = tasks[index];
      const newItem = { ...oldItem, timeLeft };
      const before = tasks.slice(0, index);
      const after = tasks.slice(index + 1);
      const newArray = [...before, newItem, ...after];
      return {
        tasks: newArray,
      };
    });
  };

  render() {
    const { tasks, filter } = this.state;

    const visibleTasks = this.filterFunc(filter);

    return (
      <section className="todoapp">
        <Header addItem={this.addItem} />

        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onToggleDone={this.onToggleDone}
            onDeleted={this.deleteItem}
            editTask={this.editTask}
            updateTimeLeft={this.updateTimeLeft}
          />
          <Footer
            tasks={tasks}
            filter={filter}
            onFiltered={this.onFiltered}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
