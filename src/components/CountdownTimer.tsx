import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate?: Date;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountdownTimer = ({ 
  targetDate,
  hours = 2,
  minutes = 0,
  seconds = 0 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        
        if (totalSeconds <= 0) {
          return { hours: hours, minutes: minutes, seconds: seconds };
        }

        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-card border border-border rounded-lg px-4 py-3 min-w-[70px] shadow-card">
        <span className="text-3xl md:text-4xl font-heading font-bold text-gradient-gold">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs uppercase tracking-widest text-foreground/60 mt-2 font-body">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center gap-3">
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <span className="text-3xl text-gold font-bold mb-6">:</span>
      <TimeBlock value={timeLeft.minutes} label="Minutes" />
      <span className="text-3xl text-gold font-bold mb-6">:</span>
      <TimeBlock value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimer;
