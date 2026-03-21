import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { jest } from '@jest/globals';
import PomodoroTimer from './PomodoroTimer';

jest.useFakeTimers();

describe('PomodoroTimer', () => {
    afterEach(() => {
        jest.clearAllTimers();
    });

    it('renders with default session and break lengths', () => {
        render(<PomodoroTimer />);
        const sessionLengths = screen.getAllByText(/25/);
        const breakLengths = screen.getAllByText(/5/);
        expect(sessionLengths.length).toBeGreaterThan(0);
        expect(breakLengths.length).toBeGreaterThan(0);
    });

    it('displays initial time in seconds (25 * 60)', () => {
        render(<PomodoroTimer />);
        expect(screen.getByText(/25:00/)).toBeInTheDocument();
    });

    it('starts and stops the timer', () => {
        render(<PomodoroTimer />);
        const startButton = screen.getByRole('button', { name: /start|pause/i });
        
        fireEvent.click(startButton);
        act(() => jest.advanceTimersByTime(1000));
        expect(screen.getByText(/24:59/)).toBeInTheDocument();
        
        fireEvent.click(startButton);
        act(() => jest.advanceTimersByTime(1000));
        expect(screen.getByText(/24:59/)).toBeInTheDocument();
    });

    it('resets timer to initial state', () => {
        render(<PomodoroTimer />);
        const resetButton = screen.getByRole('button', { name: /reset/i });
        
        fireEvent.click(resetButton);
        expect(screen.getByText(/25:00/)).toBeInTheDocument();
    });

    it('switches from session to break when time runs out', () => {
        render(<PomodoroTimer />);
        const startButton = screen.getByRole('button', { name: /start|pause/i });
        
        fireEvent.click(startButton);
        act(() => jest.advanceTimersByTime(25 * 60 * 1000));
        
        expect(screen.getByText(/break/i)).toBeInTheDocument();
    });

    it('disables length adjustments while timer is running', () => {
        render(<PomodoroTimer />);
        const startButton = screen.getByRole('button', { name: /start|pause/i });
        const increaseButtons = screen.getAllByRole('button', { name: /\+/i });
        
        fireEvent.click(startButton);
        increaseButtons.forEach(btn => {
            expect(btn).toBeDisabled();
        });
    });

    it('allows length adjustments when timer is stopped', () => {
        render(<PomodoroTimer />);
        const increaseButtons = screen.getAllByRole('button', { name: /\+/i });
        
        fireEvent.click(increaseButtons[0]);
        const elements = screen.getAllByText(/26/);
        expect(elements.length).toBeGreaterThan(0);
    });

    it('enforces minimum length of 1 minute', () => {
        render(<PomodoroTimer />);
        const decreaseButtons = screen.getAllByRole('button', { name: /-/i });
        
        for (let i = 0; i < 30; i++) {
            fireEvent.click(decreaseButtons[0]);
        }
        const elements = screen.getAllByText(/1/);
        expect(elements.length).toBeGreaterThan(0);
    });

    it('enforces maximum session length of 60 minutes', () => {
        render(<PomodoroTimer />);
        const increaseButtons = screen.getAllByRole('button', { name: /\+/i });
        
        for (let i = 0; i < 50; i++) {
            fireEvent.click(increaseButtons[0]);
        }
        const elements = screen.getAllByText(/60/);
        expect(elements.length).toBeGreaterThan(0);
    });

    it('shows alert when session completes', async () => {
        render(<PomodoroTimer />);
        const startButton = screen.getByRole('button', { name: /start|pause/i });
        
        fireEvent.click(startButton);
        act(() => jest.advanceTimersByTime(25 * 60 * 1000 + 1000));
        
        await waitFor(() => {
            expect(screen.getByText(/Session complete/i)).toBeInTheDocument();
        });
    });

    it('closes alert when close button is clicked', async () => {
        render(<PomodoroTimer />);
        const startButton = screen.getByRole('button', { name: /start|pause/i });
        
        fireEvent.click(startButton);
        act(() => jest.advanceTimersByTime(25 * 60 * 1000 + 1000));
        
        const closeButton = await screen.findByRole('button', { name: /close|×/i });
        fireEvent.click(closeButton);
        
        expect(screen.queryByText(/Session complete/i)).not.toBeInTheDocument();
    });
});