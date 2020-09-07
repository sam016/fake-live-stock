import express from 'express';
import socketIO from 'socket.io';
import { getRandomData } from './stocks';

const app = express();
app.set('port', process.env.PORT || 4000);

const http = require('http').Server(app);

// set up socket.io and bind it to our
// http server.
const io = socketIO(http);

// whenever a user connects on port 4000 via
// a websocket, log that a user has connected
io.on('connection', function (client) {

  console.log('Client connected...');

  client.on('join', function (data) {
    console.log('> from client: ', JSON.parse(data));
  });

  client.on('send', function (data) {

    setInterval(function () {
      const strData = getRandomData()
        .map(({ stockCode, price }) => `${stockCode} ${price}`)
        .join('\n');

      client.emit(strData);
    }, 1000);
  })

});

const server = http.listen(4000, function () {
  console.log('listening on *:4000');
});
