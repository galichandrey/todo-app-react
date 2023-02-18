import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

import Timer from "../../../entities/Timer";

function Task(props) {
  const { taskText } = props;
  const [taskTextLocal, setTaskTextLocal] = useState(taskText);
  const [isEditing, setIsEditing] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskTextLocal.trim()) return;
    const { id, editTask } = props;
    editTask(id, taskTextLocal);
    setIsEditing(false);
  };

  const handleEditing = (event) => {
    setTaskTextLocal(event.target.value);
  };

  const taskCreationDateConverted = () => {
    const { taskCreationDate } = props;
    return formatDistanceToNow(taskCreationDate, { addSuffix: true });
  };

  useEffect(() => {
    const { id, editTask } = props;
    editTask(id, taskTextLocal);
    return setTaskTextLocal(taskTextLocal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskTextLocal]);

  const { id, done } = props;
  const { onToggleDone, onDeleted } = props;
  const { timeLeft, updateTimeLeft } = props;

  let classNames = "active";
  let checked = false;
  if (done) {
    checked = true;
    classNames = "completed";
  }

  if (isEditing) {
    classNames = "editing";
  }

  return (
    <form onSubmit={handleSubmit}>
      <li
        key={id}
        className={classNames}
      >
        {isEditing ? (
          <input
            type="text"
            className="edit"
            value={taskText}
            onChange={handleEditing}
            id="idForInput"
          />
        ) : (
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onChange={onToggleDone}
              checked={checked}
            />
            <label htmlFor="idForInput">
              <span className="title">{taskText}</span>
              <Timer
                id={id}
                done={done}
                timeLeft={timeLeft}
                updateTimeLeft={updateTimeLeft}
              />
              <span className="description">{taskCreationDateConverted()}</span>
            </label>
            <button
              className="icon icon-edit"
              type="button"
              aria-label="Edit"
              onClick={() => setIsEditing(true)}
            />
            <button
              className="icon icon-destroy"
              type="button"
              aria-label="Delete"
              onClick={onDeleted}
            />
          </div>
        )}
      </li>
    </form>
  );
}

Task.defaultProps = {
  taskText: "My Task",
  taskCreationDate: "Created less than 1 minute ago",
  onToggleDone: () => {},
  onDeleted: () => {},
};

Task.propTypes = {
  taskText: PropTypes.string,
  taskCreationDate: PropTypes.objectOf(PropTypes.number),
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
};

export default Task;
