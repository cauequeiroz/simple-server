const express = require('express');
const server = require('http').createServer();
const WebSocketServer = require('ws').Server;
const websocket = new WebSocketServer({ server: server });

const app = express();

// Basic Response
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

// WebSocket Connection
websocket.on('connection', socket => {
    if (socket.readyState === socket.OPEN) {
        socket.send('Welcome to my WebSocket Server!');
    }

    websocket.clients.forEach(client => client.send(`Number of Visitors: ${websocket.clients.size}`))
});

server.on('request', app);
server.listen(3000, () => console.log('Server running on port 3000.'));