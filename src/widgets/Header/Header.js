import React from "react";
import PropTypes from "prop-types";

import NewTaskForm from "../../features/NewTaskForm";

export default function Header({ addItem, convertMinToSec }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm
        addItem={addItem}
        convertMinToSec={convertMinToSec}
      />
    </header>
  );
}

Header.defaultProps = {
  addItem: () => {},
};

Header.propTypes = {
  addItem: PropTypes.func,
};
