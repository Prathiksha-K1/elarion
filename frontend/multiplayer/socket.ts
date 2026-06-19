let socket: WebSocket | null = null;

export function connectSocket() {
  if (socket) return socket;

  socket = new WebSocket(
    "ws://127.0.0.1:8000/ws"
  );

  socket.onopen = () => {
    console.log("Connected to Elarion WS");
  };

  socket.onclose = () => {
    console.log("Disconnected");
  };

  return socket;
}

export function getSocket() {
  return socket;
}