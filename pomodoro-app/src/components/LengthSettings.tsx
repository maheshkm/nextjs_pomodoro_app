import React from "react";
import Button from "./Button";

interface LengthSettingsProps {
    title: string;
    length: number;
    onincrease: () => void;
    ondecrease: () => void;
    isdisabled: boolean;
}

const LengthSettings: React.FC<LengthSettingsProps> = ({ title, length, onincrease, ondecrease, isdisabled }) => {
    return (
        <div className="flex flex-col items-center">  
            <h2 className="text-xl  font-bold mb-3">{title}</h2>
            <div className="flex justify-center items-center space-x-2">
                <Button variant="default" onClick={ondecrease} disabled={isdisabled}>   
                    -
                </Button>
                <span className="text-lg font-mono">{length}</span>
                <Button variant="default" onClick={onincrease} disabled={isdisabled}>
                    +
                </Button>           
            </div>
        </div>
    ); 
} 

export default LengthSettings;                  