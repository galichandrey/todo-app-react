import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    const { taskText } = this.props;
    this.state = {
      taskText,
      isEditing: false,
    };
    this.taskCreationDateConverted = this.taskCreationDateConverted.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setEditingState = this.setEditingState.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { id, editTask } = this.props;
    const { taskText } = this.state;
    editTask(id, taskText);
    this.setEditingState(false);
  }

  handleEditing(event) {
    this.setState({ taskText: event.target.value });
  }

  setEditingState(isEdit) {
    // eslint-disable-next-line arrow-body-style
    this.setState(() => {
      return {
        isEditing: isEdit,
      };
    });
  }

  taskCreationDateConverted() {
    const { taskCreationDate } = this.props;
    return formatDistanceToNow(taskCreationDate, { addSuffix: true });
  }

  render() {
    const { id, done } = this.props;
    const { onToggleDone, onDeleted } = this.props;
    const { taskText } = this.state;
    const { isEditing } = this.state;

    let classNames = "active";
    let checked = false;
    if (done) {
      classNames = "completed";
      checked = true;
    }

    if (isEditing) {
      classNames = "editing";
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <li
          key={id}
          className={classNames}
        >
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onChange={onToggleDone}
              checked={checked}
            />
            <label htmlFor="idForInput">
              <span className="description">{taskText}</span>
              <span className="created">{this.taskCreationDateConverted()}</span>
            </label>
            <button
              className="icon icon-edit"
              type="button"
              aria-label="Edit"
              onClick={() => this.setEditingState(true)}
            />
            <button
              className="icon icon-destroy"
              type="button"
              aria-label="Delete"
              onClick={onDeleted}
            />
          </div>

          <input
            type="text"
            className="edit"
            // defaultValue={this.state.taskText}
            value={taskText}
            onChange={this.handleEditing}
            id="idForInput"
          />
        </li>
      </form>
    );
  }
}

Task.defaultProps = {
  taskText: "My Task",
  taskCreationDate: "Created less than 1 minute ago",
  onToggleDone: () => {},
  onDeleted: () => {},
};

Task.propTypes = {
  taskText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  taskCreationDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
};
