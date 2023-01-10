import React from "react";
import PropTypes from "prop-types";

import NewTaskForm from "../NewTaskForm/NewTaskForm";

export default function Header({ addItem }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm addItem={addItem} />
    </header>
  );
}

Header.defaultProps = {
  addItem: () => {},
};

Header.propTypes = {
  addItem: PropTypes.func,
};
