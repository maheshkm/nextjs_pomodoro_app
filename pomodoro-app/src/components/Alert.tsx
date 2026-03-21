/*
* This component displays an alert message at the top of the screen.

* Structure:
- Left: InformationCircleIcon 
- Center: Alert message text
- Right: XMarkIcon (close button)

* Styling:
- position: fixed at the top of the screen
- full width
- padding: applied to the entire component
- background color: light blue
- text color: dark blue
- top border: dark blue
*/
import React from 'react';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AlertProps {
    message: string;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full bg-blue-100 text-blue-800 border-t-4 border-blue-800 p-4 flex items-center justify-between z-50">
            <InformationCircleIcon className="h-6 w-6 mr-2" />      
            <span className="flex-1">{message}</span>
            <button onClick={onClose} className="ml-4" aria-label="close">
                <XMarkIcon className="h-6 w-6 text-blue-800" /> 
            </button>
        </div>
    );
};
export default Alert;


