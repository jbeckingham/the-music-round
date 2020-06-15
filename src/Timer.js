import React from "react";
import ReactCountdownClock from "react-countdown-clock";

const Timer = ({ timerOn, seconds, onTimeUp, timeUp }) => {
    return (
        <>
            {timeUp ? (
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
                    seconds={seconds / 1000}
                    color="white"
                    alpha={0.9}
                    size={200}
                    onComplete={onTimeUp}
                    weight={10}
                    paused={!timerOn}
                />
            )}
        </>
    );
};

export default Timer;
