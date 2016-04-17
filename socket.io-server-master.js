
var child_process = require('child_process'),
    fork = child_process.fork,
    workers = [],
    workersNum = 2;

for(var i = 0; i < workersNum; i++) {
  workers[i] = fork('socket.io-server-worker.js', [], {
    env: {
      PORT: 3000 + i + 1,
      DEBUG: 'socket.io:*,engine'
    }
  });
}
