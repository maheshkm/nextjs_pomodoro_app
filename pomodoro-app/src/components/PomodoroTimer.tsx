// This is the main component for the Pomodoro Timer application. 
// it uses useState , useEffect,useRef and useCallback hooks to manage the timer state and behavior.
//it imports timerDisplay, lengthSettings and Alert.
//the states include sessionLength, breakLength, currentmode, isRunning and showalert.
//the default session length is 25 minutes and break length is 5 minutes and the default mode is session.
'use client';
import React, { useState, useEffect, useRef, useCallback, use } from "react";
import TimerDisplay from "./TimerDisplay";
import LengthSettings  from "./LengthSettings";
import Alert from "./Alert";    
import Controls from "./Controls";
const PomodoroTimer: React.FC = () => { 
    const [sessionLength, setSessionLength] = useState(25); // in minutes
    const [breakLength, setBreakLength] = useState(5); // in minutes
    const [currentMode, setCurrentMode] = useState<'session' | 'break'>('session');
    const [isRunning, setIsRunning] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const prevModeRef = useRef<'session' | 'break'>('session');
    const [currentTime, setCurrentTime] = useState(sessionLength * 60); // in seconds

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setCurrentTime(prevTime => {

                if (prevTime <= 0) {
                    setShowAlert(true);
                    setIsRunning(false);
                    switchMode();
                    return 0;
                }
        
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning, currentMode, breakLength, sessionLength]);
        useEffect(() => {
            prevModeRef.current = currentMode;  
        }, [currentMode]);

        const switchMode = useCallback(() => {
            const nextMode = currentMode === 'session' ? 'break' : 'session';
            const nextTime = nextMode === 'session' ? sessionLength : breakLength ;
            setCurrentMode(nextMode);    
            setCurrentTime(nextTime );
                
        
        }, [sessionLength, breakLength]);

        const handleStartStop = () => {
            setIsRunning(prevIsRunning => !prevIsRunning);
            showAlert && setShowAlert(false);
        }

        const handleReset = () => {
            setIsRunning(false);
            setCurrentMode('session');
            setCurrentTime(sessionLength * 60);
            setSessionLength(25);
            setBreakLength(5);
            setShowAlert(false);
        }

        const handleCloseAlert = () => {
            setShowAlert(false);
        }

        const getAlertMessage = () => {
            const prevMode = prevModeRef.current;
            const prevModeComplete = prevMode === 'session' ? 'Session complete! Time for a break.' : 'Break complete! Time for a new session.';
            return prevModeComplete;

        };  

        const adjustLength = (type: 'session' | 'break', adjustment: number) => {

            if (type === 'session') {
                setSessionLength(prev => Math.max(1, Math.min( prev + adjustment,60)));
                if (currentMode === 'session' && !isRunning) {
                    setCurrentTime(sessionLength + adjustment * 60);
                }
            } else {
                setBreakLength(prev => Math.max(1, Math.min( prev + adjustment,30)));
            }
        };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            {showAlert && <Alert message={getAlertMessage()} onClose={handleCloseAlert} />}
            <TimerDisplay time={currentTime} mode={currentMode} />
            <Controls isRunning={isRunning} onStartPause={handleStartStop} onReset={handleReset} />
            <div className="mt-6 grid grid-cols-2 gap-4">
                <LengthSettings 
                title="Session Length" 
                length={sessionLength} 
                onincrease={() => adjustLength('session', 1)} 
                ondecrease={() => adjustLength('session', -1)} 
                isdisabled={isRunning}
                />
                <LengthSettings 
                title="Break Length" 
                length={breakLength} 
                onincrease={() => adjustLength('session', 1)} 
                ondecrease={() => adjustLength('session', -1)} 
                isdisabled={isRunning}
                />
            </div>
        </div>
        
    );
};
export default PomodoroTimer;