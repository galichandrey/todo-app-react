/* eslint-disable prettier/prettier */
import React from "react";

import convertSecToMin from "../model";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerId: "",
      timeLeft: 0,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    if (!this.state.timeLeft) {
      const { timeLeft } = this.props;
      this.setState(() => ({
        timeLeft,
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { done } = this.props;
    if (done !== prevProps.done) {
      this.pauseTaskTimer();
    }

    // eslint-disable-next-line react/destructuring-assignment
    if (prevState.timeLeft !== this.state.timeLeft) {
      const { id, updateTimeLeft } = this.props;
      const { timeLeft } = this.state;
      updateTimeLeft(id, timeLeft);
    }
  }

  componentWillUnmount() {
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  playTaskTimer = () => {
    let { timerId } = this.state;
    if (timerId) return;
    const { done } = this.props;
    if (done) {
      return;
    }
    timerId = setInterval(() => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.timeLeft <= 0) {
        this.pauseTaskTimer();
        this.setState(() => ({
          timeLeft: 0,
        }));
        return;
      }
      this.setState(({ timeLeft }) => ({
        timeLeft: timeLeft - 1,
      }));
    }, 1000);
    this.setState(() => ({
      timerId,
    }));
  };

  pauseTaskTimer = () => {
    const { timerId } = this.state;
    clearInterval(timerId);
    this.setState(() => ({
      timerId: 0,
    }));
  };

  render() {
    const { timeLeft } = this.state;
    const time = convertSecToMin(timeLeft);
    return (
      <span className="description">
        <button
          type="button"
          className="icon icon-play"
          onClick={this.playTaskTimer}
          aria-label="Play"
        />
        <button
          type="button"
          className="icon icon-pause"
          onClick={this.pauseTaskTimer}
          aria-label="Pause"
        />
        {time[0] < 10 ? ` 0${time[0]}:` : ` ${time[0]}:`}
        {time[1] < 10 ? `0${time[1]} ` : `${time[1]} `}
      </span>

    );
  }
}

export default Timer;
