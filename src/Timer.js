import React from "react";
import ReactCountdownClock from "react-countdown-clock";
import { gameStates } from "./config";

const Timer = ({ seconds, clearDownFlag, gameState, onTimeUp }) => {
  return (
    <>
      {!clearDownFlag && (
        <>
          {gameState === gameStates.TIME_UP ? (
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              Time's up!
            </h2>
          ) : (
            <ReactCountdownClock
              key={gameState}
              seconds={seconds}
              color="white"
              alpha={0.9}
              size={200}
              onComplete={onTimeUp}
              weight={10}
              paused={gameState !== gameStates.PLAYING}
              showMilliseconds={false}
            />
          )}
        </>
      )}
    </>
  );
};

export default Timer;
