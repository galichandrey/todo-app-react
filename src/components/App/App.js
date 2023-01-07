/* eslint-disable no-console */
import React, { Component } from "react";

import Header from "../Header";
import Footer from "../Footer";
import TaskList from "../TaskList";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.maxId = 100;
    this.state = {
      tasks: [
        this.createTodoItem("Completed task"),
        this.createTodoItem("Editing task"),
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
        this.createTodoItem("Active task"),
        this.createTodoItem("Active task 2"),
        this.createTodoItem("test 2"),
      ],
    };
    this.deleteItem = this.deleteItem.bind(this);
    // this.addItem = this.addItem.bind(this);
    this.onToggleDone = this.onToggleDone.bind(this);
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
      return { tasks: newArray };
    });
    console.log(id);
  }

  createTodoItem(todoText, done) {
    this.maxId += 1;
    return {
      taskText: todoText,
      done,
      taskCreationDate: "created 1 minute ago",
      id: this.maxId,
    };
  }

  // addItem(text) {
  //   const newItem = this.createTodoItem(text);
  //   this.setState(({ tasks }) => {
  //     const newArray = [...tasks, newItem];

  //     return {
  //       tasks: newArray,
  //     };
  //   });
  // }

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

  render() {
    const { tasks } = this.state;

    return (
      <section className="todoapp">
        <Header />

        <section className="main">
          <TaskList tasks={tasks} onToggleDone={this.onToggleDone} onDeleted={this.deleteItem} />
          <Footer tasks={tasks} />
        </section>
      </section>
    );
  }
}
