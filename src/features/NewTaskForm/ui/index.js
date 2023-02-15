/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.css";

import convertMinToSec from "../model";

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskText: "",
      min: "",
      sec: "",
    };
  }

  onLabelChange = (e) => {
    const { name } = e.target;

    let { value } = e.target;

    if (e.target.type === "number" && e.target.value < 0) {
      value = 0;
    }

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { addItem } = this.props;
    const { taskText, min, sec } = this.state;
    if (!min && !sec) return;

    const time = convertMinToSec(min, sec);

    if (time) {
      addItem(taskText, time);
      this.setState({
        taskText: "",
        min: "",
        sec: "",
      });
    }
  };

  render() {
    const { taskText, min, sec } = this.state;
    return (
      <form
        onSubmit={this.onSubmit}
        className="new-todo-form"
      >
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          name="taskText"
          value={taskText}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Min"
          onChange={this.onLabelChange}
          name="min"
          value={min}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Sec"
          onChange={this.onLabelChange}
          name="sec"
          value={sec}
        />
        <input
          type="submit"
          className="newTaskForm__submit"
          aria-label="Submit"
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {},
};

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
};
