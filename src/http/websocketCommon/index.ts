export default function WS(url: string) {
  const ws: WebSocket = new WebSocket(url);
  return ws;
};