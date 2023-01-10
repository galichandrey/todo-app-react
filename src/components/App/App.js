/* eslint-disable react/no-unused-class-component-methods */
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
        this.createTodoItem("First task", new Date("Jan 10 2023 10:03:27")),
        this.createTodoItem("Second task", new Date("Jan 10 2023 10:23:27")),
        this.createTodoItem("Another task", new Date("Jan 10 2023 10:33:27")),
        this.createTodoItem("Some task", new Date("Jan 10 2023 10:43:27")),
        this.createTodoItem("Super task!", new Date("Jan 10 2023 11:53:27")),
      ],
      filter: "all",
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editTask = this.editTask.bind(this);
    this.onToggleDone = this.onToggleDone.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.filterFunc = this.filterFunc.bind(this);
    this.onFiltered = this.onFiltered.bind(this);
  }

  onToggleDone(id) {
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
  }

  onFiltered(filter) {
    this.setState({ filter });
  }

  editTask(id, text) {
    this.setState(({ tasks }) => {
      // eslint-disable-next-line no-console
      console.log(id, text);
      const index = tasks.findIndex((element) => element.id === id);

      const oldItem = tasks[index];
      const newItem = { ...oldItem, taskText: text };

      const before = tasks.slice(0, index);
      const after = tasks.slice(index + 1);

      const newArray = [...before, newItem, ...after];
      // eslint-disable-next-line no-console
      // console.log("editTask is fired!");
      return {
        tasks: newArray,
      };
    });
  }

  filterFunc(filter) {
    const { tasks } = this.state;
    if (filter === "all") {
      return [...tasks];
    }
    if (filter === "active") {
      return [...tasks].filter((element) => !element.done);
    }
    if (filter === "completed") {
      return [...tasks].filter((element) => element.done);
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

  createTodoItem(todoText = "My Task", taskCreationDate = new Date(Date.now())) {
    this.maxId += 1;
    return {
      id: this.maxId,
      taskText: todoText,
      taskCreationDate,
      done: false,
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

    return (
      <section className="todoapp">
        <Header addItem={this.addItem} />

        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onToggleDone={this.onToggleDone}
            onDeleted={this.deleteItem}
            editTask={this.editTask}
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
