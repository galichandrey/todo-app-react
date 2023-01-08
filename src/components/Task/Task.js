/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

function Task(props) {
  const { taskText, taskCreationDate } = props;
  const { onToggleDone, onDeleted, checked } = props;

  return (
    <div className="view">
      <input className="toggle" type="checkbox" onChange={onToggleDone} checked={checked} />
      <label>
        <span className="description">{taskText}</span>
        <span className="created">{taskCreationDate}</span>
      </label>
      <button className="icon icon-edit" type="button" aria-label="Edit" />
      <button className="icon icon-destroy" type="button" aria-label="Delete" onClick={onDeleted} />
    </div>
  );
}

export default Task;
