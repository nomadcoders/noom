import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log("Disconnected from the Browser ❌");
}

function onSocketMessage(message) {
  console.log(message);
}

wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅");
  socket.on("close", onSocketClose);
  socket.on("message", onSocketMessage);
  socket.send("hello!!!");
});

server.listen(3000, handleListen);
