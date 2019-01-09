const socketio = require('socket.io')
const { redis, saveUser } = require('./redis')
const sessionsMap = {}

module.exports.listen = function(app){
    io = socketio.listen(app)

    io.on('connection', socket => {
      console.log('connected user', socket.id)

      socket.on('join', (payload) => {
        sessionsMap[payload.email] = socket.id;
        console.log(sessionsMap)
      })

      socket.on('send', (payload) => {
        const receiverId = sessionsMap[payload.whoget.email];
        const messageData = {
          message: 'Hello someone chat you',
          sender: payload.sender.email
        };
        socket.broadcast.to(receiverId).emit('send', messageData);
      });

      socket.on('chat', data => {
        const receiverId = sessionsMap[data.email];
        socket.broadcast.to(receiverId).emit('chat', data.message);
      })
    })
    return io
}