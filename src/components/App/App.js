/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { Component } from "react";

import Header from "../Header";
import Footer from "../Footer";
import TaskList from "../TaskList";

import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.maxId = 100;
    this.state = {
      tasks: [
        this.createTodoItem("First task"),
        this.createTodoItem("Second task"),
        // {
        //   taskText: "Completed task",
        //   status: "completed",
        //   taskCreationDate: "created 17 seconds ago",
        //   id: 1,
        // },
        // {
        //   taskText: "Editing task",
        //   // status: "active ",
        //   status: "editing",
        //   taskCreationDate: "Now",
        //   id: 2,
        // },
        // {
        //   taskText: "Active task",
        //   status: "active",
        //   taskCreationDate: "created 5 minutes ago",
        //   id: 3,
        // },
        this.createTodoItem("Another task"),
        this.createTodoItem("Some task"),
        this.createTodoItem("Super task!"),
      ],
      filter: "all",
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleDone = this.onToggleDone.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.filterFunc = this.filterFunc.bind(this);
    this.onFiltered = this.onFiltered.bind(this);
  }

  onToggleDone(id) {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((element) => element.id === id);

      // 1. update object
      const oldItem = tasks[index];
      const newItem = { ...oldItem, done: !oldItem.done };

      // 2. construct new array
      const before = tasks.slice(0, index);
      const after = tasks.slice(index + 1);

      const newArray = [...before, newItem, ...after];
      return {
        tasks: newArray,
      };
    });
    console.log(id);
  }

  onFiltered(filter) {
    this.setState({ filter });
  }

  filterFunc(filter) {
    const { tasks } = this.state;
    if (filter === "all") {
      return [...tasks];
    }
    if (filter === "active") {
      const newArray = [...tasks];
      return newArray.filter((element) => !element.done);
    }
    if (filter === "completed") {
      const newArray = [...tasks];
      return newArray.filter((element) => element.done);
    }
    return [...tasks];
  }

  deleteItem(id) {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((element) => element.id === id);

      const before = tasks.slice(0, index);
      const after = tasks.slice(index + 1);

      const newArray = [...before, ...after];

      return {
        tasks: newArray,
      };
    });
  }

  addItem(text) {
    const newItem = this.createTodoItem(text);
    this.setState(({ tasks }) => {
      const newArray = [...tasks, newItem];
      return {
        tasks: newArray,
      };
    });
  }

  createTodoItem(todoText) {
    this.maxId += 1;
    return {
      taskText: todoText,
      done: false,
      taskCreationDate: "created 1 minute ago",
      id: this.maxId,
    };
  }

  clearCompleted() {
    this.setState(({ tasks }) => {
      const newArray = [...tasks];
      const clearedArray = newArray.filter((element) => !element.done);

      return {
        tasks: clearedArray,
      };
    });
  }

  render() {
    const { tasks, filter } = this.state;

    const visibleTasks = this.filterFunc(filter);
    console.log(visibleTasks);

    return (
      <section className="todoapp">
        <Header addItem={this.addItem} />

        <section className="main">
          <TaskList tasks={visibleTasks} onToggleDone={this.onToggleDone} onDeleted={this.deleteItem} />
          <Footer tasks={tasks} filter={filter} onFiltered={this.onFiltered} clearCompleted={this.clearCompleted} />
        </section>
      </section>
    );
  }
}
