import express from 'express';
import path from 'path';
import socketIO from 'socket.io';
import { getRandomData } from './stocks';

const port = process.env.PORT || 4000;
const app = express();
app.set('port', port);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const http = require('http').Server(app);

// set up socket.io and bind it to our
// http server.
const io = socketIO(http);

// whenever a user connects on port 4000 via
// a websocket, log that a user has connected
io.on('connection', function (client) {

  console.log('Client connected...');

  const intervalId = setInterval(function () {
    const randomData = getRandomData();
    const strData = randomData
      .map(({ stockCode, price }) => `${stockCode} ${price}`)
      .join('\n');

    client.emit('message', strData);
  }, 500);

  client.on('disconnect', function (data) {
    console.log('client closed');
    clearInterval(intervalId);
  });

});

http.listen(port, function () {
  console.log(`listening on *:${port}`);
});
