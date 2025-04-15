"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Si ya pasó la fecha
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calcular inmediatamente
    calculateTimeLeft();

    // Actualizar cada segundo
    const timer = setInterval(calculateTimeLeft, 1000);

    // Limpiar intervalo al desmontar
    return () => clearInterval(timer);
  }, [targetDate]);

  // Función para formatear números a dos dígitos
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="text-center space-y-2">
      <h3 className="font-script text-xl gold-text">Reserva la fecha</h3>
      <div className="flex justify-center space-x-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center bg-black/20 rounded-lg border border-gold/20">
          <span className="text-lg sm:text-xl font-bold gold-text">
            {formatNumber(timeLeft.days)}
          </span>
          <span className="text-xs">Días</span>
        </div>
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center bg-black/20 rounded-lg border border-gold/20">
          <span className="text-lg sm:text-xl font-bold gold-text">
            {formatNumber(timeLeft.hours)}
          </span>
          <span className="text-xs">Horas</span>
        </div>
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center bg-black/20 rounded-lg border border-gold/20">
          <span className="text-lg sm:text-xl font-bold gold-text">
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="text-xs">Min</span>
        </div>
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center bg-black/20 rounded-lg border border-gold/20">
          <span className="text-lg sm:text-xl font-bold gold-text">
            {formatNumber(timeLeft.seconds)}
          </span>
          <span className="text-xs">Seg</span>
        </div>
      </div>
    </div>
  );
}
