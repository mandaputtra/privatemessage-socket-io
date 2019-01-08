const socketio = require('socket.io')
const { redis, saveUser } = require('./redis')
const sessionsMap = {}

module.exports.listen = function(app){
    io = socketio.listen(app)

    io.on('connection', socket => {
      console.log('connected user', socket.id)

      socket.on('join', (payload) => {
        console.log(payload)
        sessionsMap[payload.email] = socket.id;
        console.log(sessionsMap)
      })

      socket.on('send', (payload) => {
        const receiverId = sessionsMap[payload.email];
        const messageData = 'halo dari sebelah';
        socket.broadcast.to(receiverId).emit('send', messageData);
      });
    })
    return io
}