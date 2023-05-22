import { io } from "socket.io-client";
import Vue from "vue";

const socket = new io("ws://localhost:8090", {
  transports: ["websocket"],
});
socket.connect();

socket.on("connect", (data) => {
  console.log("Connect To Socket");
});
export default ({ app }, inject) => {
  inject("socket", Vue.observable({ main: socket }));
};