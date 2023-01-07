import React from "react";

import NewTaskForm from "../NewTaskForm/NewTaskForm";

function Header() {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm />
    </header>
  );
}

export default Header;
