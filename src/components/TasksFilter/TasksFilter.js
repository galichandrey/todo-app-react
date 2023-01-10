import React from "react";
import PropTypes from "prop-types";

export default class TaskFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      buttons: [
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
      ],
    };
  }

  render() {
    const { buttons } = this.state;
    const { filter, onFiltered } = this.props;
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
}

TaskFilter.defaultProps = {
  filter: "all",
  onFiltered: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFiltered: PropTypes.func,
};
