
var express = require('express'),
    sio_redis = require('socket.io-redis'),
    app = new express(),
    server = app.listen(process.env.PORT || 3001),
    io = require('socket.io')(server);

app.use(express.static(__dirname));
app.get('/', function(req, res) {
  res.sendFile('./index.html', {root: __dirname});
});

io.adapter(sio_redis({ host: 'localhost', port: 6379 }));

io.on('connection', function(socket) {
  console.log(socket.id, 'connected to', process.pid);
  // io.emit('newSocket', socket.id);
  socket.join('common');

  socket.on('message', function(data) {
    console.log('message', data);
    io.to('common').emit('message', data);
  });

  socket.on('privateMessage', function(data) {
    console.log('privateMessage', data);
    io.to('/#' + data.to).emit('privateMessage', data);
  });

  socket.on('broadcast', function(data) {
    console.log('broadcast', data);
    io.emit('broadcast', data);
  });

  socket.on('disconnect', function(reason) {
    console.log(socket.id, 'disconnected with reason:', reason);
  });
});

