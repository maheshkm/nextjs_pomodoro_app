import PomodoroTimer from "@/src/components/PomodoroTimer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      <head>
        <title>Pomodoro Timer</title>

      </head>
      <PomodoroTimer />
    </div>
  );
}
