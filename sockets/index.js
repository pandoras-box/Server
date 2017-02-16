const jwtAuth = require('../auth/jwtAuth');
let getIO = null;

function initialize(io) {
    io.on('connection', connected);
    getIO = function() {
        return io;
    }
}


function connected(socket) {
    socket.emit('news', {
        hello: 'world'
    });

    socket.on('updateTaskApproval', updateTaskApproval);
    socket.on('testConnection', testConnection);
    socket.on('unlockBox', unlockBox);
    socket.on('room', room(socket));
}

function updateTaskApproval(data) {
    const completed = data.accepted;
    const ROOM = 1;
    const io = getIO();
    console.log(data);
    const updatePayload = {
      task: 1,
      completed: completed
    }
    io.sockets.emit('taskUpdate', updatePayload);
}

function unlockBox(data) {
    const io = getIO();
    console.log("UNLOCKING")
    io.sockets.emit('unlockPi', {unlock: true});
}

function room(socket) {
    return function(connectionObject) {
        const roomID = connectionObject.roomID;
        const user = connectionObject.user;
        socket.join(roomID);
        console.log(`Joined Room ${roomID}!`);
    }
}


// function room(connectionObject) {
//     console.log("Created room?");
//     console.log(connectionObject);
//     // socket.join(roomID);
//     // console.log(`Joined Room ${roomID}!`);
// }



function testConnection(data) {
    console.log(data);
}

module.exports = {
    initialize
}
