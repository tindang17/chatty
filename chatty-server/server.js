// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuidV4 = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// Broadcast to all
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

function countClient() {
  const clientNum = {
    num: wss.clients.size,
    type: 'clientConnection'  
  };
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(clientNum));
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  countClient();

  ws.on('message', function incoming(data) {
    const message = JSON.parse(data);
    message.id = uuidV4();
    const outputMessage = {
      type: message.type,
      id: message.id,
      username: message.username,
      content: message.content
    };
  wss.broadcast(JSON.stringify(outputMessage));  
  });
// Set up a callback for when a client closes the socket. This usually means they closed their browser.
ws.on('close', () => console.log('Client disconnected'));
  countClient();
});