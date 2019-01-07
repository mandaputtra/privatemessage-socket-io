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

      socket.on('chat', (message) => {
        io.emit('chat', message)
      })

      socket.on('join', (message) => {
        io.emit('join', message)
      })

    })

    return io
}