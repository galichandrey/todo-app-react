import React from 'react';

const Task = ({taskText, taskCreationDate}) => {
  return (
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label>
        <span class="description">{taskText}</span>
        <span class="created">{taskCreationDate}</span>
      </label>
      <button class="icon icon-edit"></button>
      <button class="icon icon-destroy"></button>
    </div>
  );
}

export default Task;