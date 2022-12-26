import React from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

const Header = () => {
  return (
      <header class="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      );
}

export default Header;