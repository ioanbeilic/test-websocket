const http = require("http");
const WebSocketServer = require("websocket").server;

let connection = null;

const httpServer = http.createServer((req, res) => {
  console.log("we have recived a request");
});

const websocket = new WebSocketServer({
  httpServer: httpServer // handsake
});

websocket.on("request", request => {
  connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("opened!!!"));
  connection.on("close", () => console.log("close!!!"));
  connection.on("message", message => {
    console.log(message.utf8Data);
  });
  sendEvery5seconds();
});

httpServer.listen(8080, () => console.log("server on port 8080"));

function sendEvery5seconds() {
  connection.send(`Message ${Math.random()}`);

  setTimeout(() => {
    sendEvery5seconds();
  }, 5000);
}

/*
// on web console
let ws = new WebSocket("ws://localhost:8080")
ws.onmessage = message => console.log(message.data)
ws.send("hello server, is me the client")
*/
