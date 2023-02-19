// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

import convertSecToMin from "../model";

function Timer(props) {
  const { done } = props;
  const { id, timeLeft, updateTimeLeft } = props;
  const [timeLeftState, setTimeLeftState] = useState(timeLeft);
  const [timerId, setTimerId] = useState("");

  const pauseTaskTimer = () => {
    clearInterval(timerId);
    setTimerId("");
  };

  const playTaskTimer = () => {
    if (timerId) return;
    if (done) {
      pauseTaskTimer();
      return;
    }
    const timerIdNow = setInterval(() => {
      if (done) {
        pauseTaskTimer();
        return;
      }
      if (timeLeftState <= 0) {
        pauseTaskTimer();
        setTimeLeftState(() => 0);
        return;
      }
      setTimeLeftState((time) => time - 1);
    }, 1000);
    setTimerId(timerIdNow);
  };

  useEffect(() => {
    if (!timerId) return;
    if (done) {
      pauseTaskTimer();
      return;
    }
    if (timeLeftState <= 0) {
      pauseTaskTimer();
      setTimeLeftState(() => 0);
      return;
    }
    // eslint-disable-next-line consistent-return
    updateTimeLeft(id, timeLeftState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, timeLeftState]);

  const time = convertSecToMin(timeLeftState);

  return (
    <span className="description">
      <button
        type="button"
        className="icon icon-play"
        onClick={playTaskTimer}
        aria-label="Play"
      />
      <button
        type="button"
        className="icon icon-pause"
        onClick={pauseTaskTimer}
        aria-label="Pause"
      />
      {time[0] < 10 ? ` 0${time[0]}:` : ` ${time[0]}:`}
      {time[1] < 10 ? `0${time[1]} ` : `${time[1]} `}
    </span>
  );
}

export default Timer;
