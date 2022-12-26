import React from 'react';
import Task from '../Task';

const TaskList = ({tasks}) => {

  const elements = tasks.map((item)=>{
    return (
      <li className={item.status}>
        <Task taskText={item.taskText} taskCreationDate={item.taskCreationDate} />
        <input type="text" class="edit" value="Editing task" />
      </li>
    );
  
  });

    return (
      <ul class="todo-list">
        { elements }
      </ul>
    );
    
}

export default TaskList;