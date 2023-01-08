/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";

import TasksFilter from "../TasksFilter";

function Footer(props) {
  // eslint-disable-next-line object-curly-newline
  const { tasks, filter, onFiltered, clearCompleted } = props;
  const doneCount = tasks.filter((element) => element.done).length;
  const todoCount = tasks.length - doneCount;

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter filter={filter} onFiltered={onFiltered} />
      <button className="clear-completed" type="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
