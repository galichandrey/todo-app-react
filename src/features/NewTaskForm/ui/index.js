/* eslint-disable no-console */
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./index.css";

import convertMinToSec from "../model";

function NewTaskForm(props) {
  const [taskText, setTaskText] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const onTaskTextChange = (e) => {
    setTaskText(e.target.value);
  };

  const onMinChange = (e) => {
    setMin(e.target.value);
  };

  const onSecChange = (e) => {
    setSec(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { addItem } = props;
    if (!min && !sec) return;

    const time = convertMinToSec(min, sec);

    if (time) {
      addItem(taskText, time);
      setTaskText("");
      setMin("");
      setSec("");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="new-todo-form"
    >
      <input
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
        onChange={onTaskTextChange}
        name="taskText"
        value={taskText}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Min"
        onChange={onMinChange}
        name="min"
        value={min}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Sec"
        onChange={onSecChange}
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

export default NewTaskForm;

NewTaskForm.defaultProps = {
  addItem: () => {},
};

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
};
