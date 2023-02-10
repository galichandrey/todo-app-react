import React, { Component } from "react";
import { v4 as uuid } from "uuid";

import Header from "../Header";
import Footer from "../Footer";
import TaskList from "../TaskList";

import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        this.createTodoItem("First task", 95, new Date("Jan 09 2023 09:03:27")),
        this.createTodoItem("Second task", 111, new Date("Jan 10 2023 10:23:27")),
        this.createTodoItem("Another task", 1110, new Date("Jan 10 2023 10:33:27")),
        this.createTodoItem("Some task", 100, new Date("Jan 10 2023 10:43:27")),
        this.createTodoItem("Super task!", 10, new Date("Jan 11 2023 11:53:27")),
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

  // eslint-disable-next-line class-methods-use-this
  convertSecToMin = (time) => {
    const min = Math.floor(time / 60);
    const sec = Number(time) - Number(min * 60);
    return [min, sec];
  };

  // eslint-disable-next-line class-methods-use-this
  convertMinToSec = (min, sec) => {
    // eslint-disable-next-line no-console
    console.log(min, sec);
    return Number(min * 60) + Number(sec);
  };

  editTask = (id, text) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((element) => element.id === id);

      const oldItem = tasks[index];
      // eslint-disable-next-line no-console
      console.log(oldItem.taskText);
      const newItem = { ...oldItem, taskText: text };

      const before = tasks.slice(0, index);
      const after = tasks.slice(index + 1);

      const newArray = [...before, newItem, ...after];
      return {
        tasks: newArray,
      };
    });
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  startTimer = () => {
    let { timeLeft } = this.state;
    const timerId = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft === 0) {
        clearInterval(timerId);
      }
      this.setState({
        timeLeft,
      });
    }, 1000);
    // eslint-disable-next-line react/no-unused-state
    return this.setState({ timeLeft, timerId });

    // this.setState(({ tasks, timeLeft }) => {
    //   const index = tasks.findIndex((element) => element.id === id);
    //   const oldItem = tasks[index];

    //   timeLeft -= 1;
    //   if (timeLeft === 0) {
    //     clearInterval(timerId);
    //   }

    //   const newItem = { ...oldItem, timeLeft };

    //   const before = tasks.slice(0, index);
    //   const after = tasks.slice(index + 1);

    //   const newArray = [...before, newItem, ...after];
    //   return {
    //     tasks: newArray,
    //   };
    // });
  };

  filterFunc = (filter) => {
    const { tasks } = this.state;
    switch (filter) {
      case "all":
        return [...tasks];

      case "active":
        return [...tasks].filter((element) => !element.done);

      case "completed":
        return [...tasks].filter((element) => element.done);

      default:
        return [...tasks];
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

  // eslint-disable-next-line class-methods-use-this
  playTimer = () => {
    // eslint-disable-next-line no-console
    console.log("Play - click");
  };

  // eslint-disable-next-line class-methods-use-this
  pauseTimer = () => {
    // eslint-disable-next-line no-console
    console.log("Pause - click");
  };

  render() {
    const { tasks, filter } = this.state;

    const visibleTasks = this.filterFunc(filter);

    return (
      <section className="todoapp">
        <Header
          addItem={this.addItem}
          convertMinToSec={this.convertMinToSec}
        />

        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onToggleDone={this.onToggleDone}
            onDeleted={this.deleteItem}
            editTask={this.editTask}
            playTimer={this.playTimer}
            pauseTimer={this.pauseTimer}
            convertSecToMin={this.convertSecToMin}
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
