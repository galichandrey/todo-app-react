/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";

import TasksFilter from "../TasksFilter";

function Footer({ tasks }) {
  const doneCount = tasks.filter((element) => element.done).length;
  const todoCount = tasks.length - doneCount;
  // eslint-disable-next-line no-console
  console.log(doneCount, todoCount);

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter />
      <button className="clear-completed" type="button">
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
