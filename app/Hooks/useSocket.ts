import { useEffect, useState } from "react";
import { INIT_GAME, LEAVE_GAME } from "../constants/AppConstants";

export const useSocket = (props?: any) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { name = "" } = props;

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      setSocket(ws);
      ws?.send(JSON.stringify({ type: INIT_GAME, name: name }));
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws?.send(JSON.stringify({ type: LEAVE_GAME }));
      ws.close();
    };
  }, []);

  return socket;
};
