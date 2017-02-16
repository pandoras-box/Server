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
    socket.on('room', room(socket));


}

function updateTaskApproval(data) {
    const io = getIO();
    if (data.token) {
        const user = jwtAuth.decodeJWT(data.token);
        // console.log(data);

    }

}

function room(socket) {
    return function(connectionObject) {
        console.log("Room socket received this: ", connectionObject);
        // socket.join(roomID);
        // console.log(`Joined Room ${roomID}!`);
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
