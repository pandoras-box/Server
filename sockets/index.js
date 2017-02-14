function initialize(io) {
  io.on('connection', connected);
}


function connected(socket) {
  socket.emit('news', {
    hello:'world'
  });

  socket.on('authorizeLoggedIn', authorizeLoggedIn);
  socket.on('anotherEventName', anotherEventName);

}

function authorizeLoggedIn(data){
  

}

function anotherEventName(data) {
  console.log(data);
}

module.exports = {
  initialize
}
