import React, { useState } from "react";
import PropTypes from "prop-types";

const buttonsInitial = [
  {
    name: "all",
    label: "All",
  },
  {
    name: "active",
    label: "Active",
  },
  {
    name: "completed",
    label: "Completed",
  },
];

function TaskFilter(props) {
  const [buttons] = useState(buttonsInitial);

  const { filter, onFiltered } = props;
  const elements = buttons.map((button) => {
    const { name, label } = button;
    const isActive = filter === name;
    const classNames = isActive ? "selected" : "noClass";
    return (
      <li key={name}>
        <button
          type="button"
          className={classNames}
          onClick={() => onFiltered(name)}
        >
          {label}
        </button>
      </li>
    );
  });
  return <ul className="filters">{elements}</ul>;
}

TaskFilter.defaultProps = {
  filter: "all",
  onFiltered: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFiltered: PropTypes.func,
};

export default TaskFilter;
