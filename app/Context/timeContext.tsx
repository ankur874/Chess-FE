import React, { createContext, useContext, useRef, useState } from "react";

export interface TimeProps {
  myTime: number;
  opponentTime: number;
  startTime: (isMine: boolean) => void;
  stopTime: (isMine: boolean) => void;
  resetTime: () => void;
}

export const TimeContext = createContext<TimeProps | undefined>(undefined);

export const TimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [myTime, setMyTime] = useState(600);
  const [opponentTime, setOpponentTime] = useState(600);
  const myTimeIntervalRef = useRef<any>();
  const opponentTimeIntervalRef = useRef<any>();

  const startTime = (isMine: boolean) => {
    if (isMine) {
      const intervalId = setInterval(() => {
        myTimeIntervalRef.current = intervalId;
        if (myTime <= 0) {
          clearInterval(intervalId);
          return;
        }
        setMyTime((prev) => {
          return prev - 1;
        });
      }, 1000);
    } else {
      const intervalId = setInterval(() => {
        opponentTimeIntervalRef.current = intervalId;
        if (opponentTime <= 0) {
          clearInterval(intervalId);
          return;
        }
        setOpponentTime((prev) => {
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTime = (isMine: boolean) => {
    if (isMine) {
      clearInterval(myTimeIntervalRef.current);
    } else {
      clearInterval(opponentTimeIntervalRef.current);
    }
  };

  const resetTime = () => {
    clearInterval(myTimeIntervalRef.current);
    clearInterval(opponentTimeIntervalRef.current);
    setMyTime(600);
    setOpponentTime(600);
  };

  return (
    <TimeContext.Provider
      value={{ myTime, opponentTime, startTime, stopTime, resetTime }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => {
  const context = useContext(TimeContext);
  if (context == null) {
    throw new Error("time context not defined");
  }
  return context;
};
