const jwtAuth = require('../auth/jwtAuth');

function initialize(io) {
  io.on('connection', connected);
}


function connected(socket) {
  socket.emit('news', {
    hello:'world'
  });

  socket.on('updateTaskApproval', updateTaskApproval);
  socket.on('testConnection', testConnection);
  socket.on('create', create);


}

function updateTaskApproval(data){
  if(data.token){
    const user = jwtAuth.decodeJWT(data.token);
    console.log(data);

  }

}

function create(roomID) {
  // socket.join(roomID);
  // console.log(`Joined Room ${roomID}!`);
}

function testConnection(data) {
  console.log(data);
}

module.exports = {
  initialize
}
