import SocketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const Socket = SocketIOClient(ENDPOINT);

export default Socket;
