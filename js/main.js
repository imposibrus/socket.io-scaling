
var sockets = [],
    socketsNum = 2;

for(var i = 0; i < socketsNum; i++) {
  (function(i) {
    setTimeout(function() {
      sockets[i] = io.connect('http://' + document.location.host + '/?userId=' + i, {
        'force new connection': true
      }).on('message', function(data) {
        console.log('socket '+ i +': got `message`', data);
      }).on('broadcast', function(data) {
        console.log('socket '+ i +': got `broadcast`', data);
      }).on('privateMessage', function(data) {
        console.log('socket '+ i +': got `privateMessage`', data);
      });
    }, 1000 * i);
  })(i);
}

setTimeout(function() {
  sockets[0].emit('privateMessage', {to: sockets[1].id, test: 'some text'});
}, 1000 * socketsNum);
