const socketio = require('socket.io')
const { redis, saveUser } = require('./redis')

module.exports.listen = function(app){
    io = socketio.listen(app)

    io.on('connection', socket => {
      console.log('connected user', socket.id)
      io.to(socket.id).emit('someoneChat', 'data');

      socket.on('joinChatLobby', (payload) => {
        redis.set(payload.email, socket.id)
      })

      socket.on('joinChatRoom', (payload) => {
        // console.log(payload);
        io.to(socket.id).emit('someoneChat', payload);
      })

      // socket.on('chatSomebody', (clientId, roomName, clientThatChat) => {
      //   client.join(roomName)
      //   io.emit('someoneChat', clientThatChat)
      // })

      socket.on('chat', (message) => {
        console.log(message)
        // io.sockets.in(roomName).emit('chat', message)
      })
    })

    return io
}