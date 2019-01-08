const socketio = require('socket.io')
const { redis, saveUser } = require('./redis')
const sessionsMap = {}

module.exports.listen = function(app){
    io = socketio.listen(app)

    io.on('connection', socket => {
      console.log('connected user', socket.id)
      const sessionId = socket.id;

      socket.on('join', () => {
        socket.emit('askForUserId');
      })

      socket.on('userIdReceived', (userId) => {
        console.log(userId)
        sessionsMap[userId] = sessionId;
        console.log(sessionsMap)
      });

      socket.on('send', (payload) => {
        const receiverId = sessionsMap[payload.whoGet.email];
        const messageData = 'halo dari sebelah';
        socket.broadcast.to(receiverId).emit('my message', messageData);
      });

    })

    return io
}