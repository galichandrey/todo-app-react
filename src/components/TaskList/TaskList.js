/* eslint-disable max-len */
import React from "react";

import Task from "../Task";

function TaskList({ tasks, onToggleDone, onDeleted }) {
  const elements = tasks.map((item) => {
    // eslint-disable-next-line object-curly-newline
    const { taskText, done, taskCreationDate, id } = item;

    let classNames = "active";
    let checked = false;
    if (done) {
      classNames = "completed";
      checked = true;
    }

    return (
      <li key={id} className={classNames}>
        <Task
          checked={checked}
          taskText={taskText}
          taskCreationDate={taskCreationDate}
          onToggleDone={() => onToggleDone(id)}
          onDeleted={() => onDeleted(id)}
        />
        <input type="text" className="edit" value="Editing task" />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
