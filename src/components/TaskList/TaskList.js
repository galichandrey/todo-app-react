import React from "react";
import PropTypes from "prop-types";

import Task from "../Task";

export default function TaskList(props) {
  const { editTask } = props;
  const { tasks, onToggleDone, onDeleted } = props;

  const elements = tasks.map((item) => {
    // eslint-disable-next-line object-curly-newline
    const { id, taskText, taskCreationDate, done } = item;
    return (
      <Task
        key={id}
        id={id}
        taskText={taskText}
        taskCreationDate={taskCreationDate}
        done={done}
        onToggleDone={() => onToggleDone(id)}
        onDeleted={() => onDeleted(id)}
        editTask={editTask}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  tasks: PropTypes.shape({
    taskText: PropTypes.string,
    done: PropTypes.bool,
    taskCreationDate: PropTypes.number,
    id: PropTypes.number,
  }),
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
};
