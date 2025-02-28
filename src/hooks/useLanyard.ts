import { useEffect, useState } from "react";

interface DiscordUser {
  username: string;
  display_name: string;
}

interface Activity {
  name: string;
  type: number;
}

interface LanyardData {
  discord_user: DiscordUser;
  discord_status: string;
  activities?: Activity[];
}

const LANYARD_WS_URL = "wss://api.lanyard.rest/socket";
const DISCORD_USER_ID = "1050576240056209408";

let globalData: LanyardData | null = null;
let subscribers: ((data: LanyardData | null) => void)[] = [];
let ws: WebSocket | null = null;

const notifySubscribers = (data: LanyardData | null) => {
  globalData = data;
  subscribers.forEach((callback) => callback(data));
};

const connectWebSocket = () => {
  if (ws) return;

  ws = new WebSocket(LANYARD_WS_URL);

  ws.onopen = () => {
    ws?.send(
      JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_USER_ID } })
    );
  };

  ws.onmessage = (event) => {
    const response = JSON.parse(event.data);
    if (response.op === 0) {
      notifySubscribers(response.d);
    }
  };

  ws.onerror = () => {
    ws = null;
    setTimeout(connectWebSocket, 5000);
  };

  ws.onclose = () => {
    ws = null;
    setTimeout(connectWebSocket, 5000);
  };
};

const useLanyard = () => {
  const [data, setData] = useState<LanyardData | null>(globalData);
  const [loading, setLoading] = useState(!globalData);

  useEffect(() => {
    connectWebSocket();

    const updateState = (newData: LanyardData | null) => {
      setData(newData);
      setLoading(false);
    };

    subscribers.push(updateState);

    return () => {
      subscribers = subscribers.filter((cb) => cb !== updateState);
    };
  }, []);

  return { data, loading };
};

export default useLanyard;
