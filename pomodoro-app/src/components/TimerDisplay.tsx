import React from "react";
interface TimerDisplayProps {
    time: number; // time left in seconds
    mode: 'session' | 'break'; // whether it's a session or break
}
const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, mode }) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return (
        <div className="text-center">
            
            <h1 className=" text-4xl text-gray-800 font-bold mb-5">
                {mode}
            </h1>
            <p className="text-6xl text-gray-800 font-bold mb-5">{minutes}:{seconds}  </p>
        </div>
    );
}
export default TimerDisplay;
