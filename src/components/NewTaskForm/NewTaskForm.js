import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { addItem } = this.props;
    const { label } = this.state;
    e.preventDefault();
    addItem(label);
    this.setState({
      label: "",
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {},
};

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
};
