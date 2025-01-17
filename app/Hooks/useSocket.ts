import { useEffect, useState } from "react"
import { INIT_GAME } from "../constants/AppConstants";


export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);


    useEffect(() => {
        const ws = new WebSocket("https://chess-backend-6heh.onrender.com");
        ws.onopen = () => {
            console.log("connected!!!");
            setSocket(ws);
            ws?.send(JSON.stringify({ type: INIT_GAME }));
        }

        ws.onclose = () => {
            console.log("disconnected!!!");
            setSocket(null);
        }

        return () => {
            ws.close();
        }

    }, [])

    return socket
}