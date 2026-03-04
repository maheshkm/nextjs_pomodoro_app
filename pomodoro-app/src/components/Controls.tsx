// component to control the timer (start, pause, reset)
// displays two buttons: Start/Pause and Reset
// props: isRunning (boolean), onStartPause (function), onReset (function)
// uses ./button.tsx for the buttons
import React from 'react';
import Button from './Button';

interface ControlsProps {
    isRunning: boolean;
    onStartPause: () => void;
    onReset: () => void;
}
const Controls: React.FC<ControlsProps> = ({ isRunning, onStartPause, onReset }) => {
    return (
        <div className="flex space-x-4">
            <Button variant="primary" onClick={onStartPause}> 
                {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button variant="danger" onClick={onReset}>
                Reset   
            </Button>
        </div>
    );
}
export default Controls;



