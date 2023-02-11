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
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { taskText } = this.state;
    if (!taskText.trim()) return;
    const { id, editTask } = this.props;
    editTask(id, taskText);
    this.setEditingState(false);
  };

  handleEditing = (event) => {
    this.setState({ taskText: event.target.value });
  };

  setEditingState = (isEdit) => {
    this.setState(() => ({
      isEditing: isEdit,
    }));
  };

  taskCreationDateConverted() {
    const { taskCreationDate } = this.props;
    return formatDistanceToNow(taskCreationDate, { addSuffix: true });
  }

  render() {
    const { id, done } = this.props;
    const { onToggleDone, onDeleted } = this.props;
    const { taskText } = this.state;
    const { isEditing } = this.state;
    const { timeLeft } = this.props;
    const { convertSecToMin } = this.props;
    const time = convertSecToMin(timeLeft);
    const { playTaskTimer, pauseTaskTimer } = this.props;

    let classNames = "active";
    let checked = false;
    if (done) {
      checked = true;
      classNames = "completed";
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
          {isEditing ? (
            <input
              type="text"
              className="edit"
              value={taskText}
              onChange={this.handleEditing}
              id="idForInput"
            />
          ) : (
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                onChange={onToggleDone}
                checked={checked}
              />
              <label htmlFor="idForInput">
                <span className="title">{taskText}</span>
                <span className="description">
                  <button
                    type="button"
                    className="icon icon-play"
                    onClick={() => playTaskTimer(id)}
                    aria-label="Play"
                  />
                  <button
                    type="button"
                    className="icon icon-pause"
                    onClick={() => pauseTaskTimer(id)}
                    aria-label="Pause"
                  />
                  {time[0] < 10 ? ` 0${time[0]}:` : ` ${time[0]}:`}
                  {time[1] < 10 ? `0${time[1]} ` : `${time[1]} `}
                </span>
                <span className="description">{this.taskCreationDateConverted()}</span>
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
          )}
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
  taskCreationDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
};
