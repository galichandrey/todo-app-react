/* eslint-disable prettier/prettier */
import React from "react";

import convertSecToMin from "../model";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerId: "",
    };
  }

  componentDidUpdate(prevProps) {
    const { done } = this.props;
    if (done !== prevProps.done) {
      this.handleStopTimer();
    }
  }

  componentWillUnmount() {
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  handleStartTimer = () => {
    const { done } = this.props;
    if (done) {
      this.handleStopTimer();
      return;
    }
    const { timerId } = this.state;
    if (timerId) {
      clearInterval(timerId);
    }

    const { id, playTaskTimer } = this.props;
    this.setState(() => {
      const aaa = playTaskTimer(id);
      return {
        timerId: aaa,
      };
    });
  };

  handleStopTimer = () => {
    const { timerId } = this.state;
    clearInterval(timerId);
    this.setState(() => ({
      timerId: "",
    }));
  };

  render() {
    const { timeLeft } = this.props;
    const time = convertSecToMin(timeLeft);
    return (
      <span className="description">
        <button
          type="button"
          className="icon icon-play"
          onClick={this.handleStartTimer}
          aria-label="Play"
        />
        <button
          type="button"
          className="icon icon-pause"
          onClick={this.handleStopTimer}
          aria-label="Pause"
        />
        {time[0] < 10 ? ` 0${time[0]}:` : ` ${time[0]}:`}
        {time[1] < 10 ? `0${time[1]} ` : `${time[1]} `}
      </span>

    );
  }
}

export default Timer;
