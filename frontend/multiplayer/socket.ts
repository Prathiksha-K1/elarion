let socket: WebSocket | null = null;

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ||
  "wss://elarion.onrender.com/ws";

export function connectSocket() {
  if (socket) return socket;

  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("Connected to Elarion WS");
  };

  socket.onclose = () => {
    console.log("Disconnected");
    socket = null;
  };

  socket.onerror = (error) => {
    console.error("WS Error:", error);
  };

  return socket;
}

export function getSocket() {
  return socket;
}